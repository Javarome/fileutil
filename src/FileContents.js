import fs from "fs"
import { writeFile } from "./writeFile.js"
import { detectEncoding } from "./detectEncoding.js"
/** @import { FileContentsLang } from "./FileContentsLang.js" */

/**
 * A file.
 */
export class FileContents {
  /**
   * A file path with "directory/prefix[_lang].ext"
   *
   * @protected
   * @readonly
   */
   static filePathRegex = /(.*\/)?(.*?)(?:_([a-z]{2}))?\.(.*)/

  /**
   * A file name with "prefix[_lang].ext"
   *
   * @protected
   * @readonly
   */
  static fileRegex = /(.*?)(?:_([a-z]{2}))?\.(.*)/

  /**
   * Language info about the file.
   *
   * @protected
   * @readonly
   * @type {FileContentsLang}
   */
  lang

  /**
   * Language info about the file.
   *
   * @readonly
   * @type {Date}
   */
  lastModified

  /**
   * The file contents as text.
   *
   * @protected
   * @readonly
   * @type {string}
   */
  _contents

  /**
   * The contents encoding ("utf8", etc.).
   *
   * @readonly
   * @type {BufferEncoding}
   */
  encoding

  /**
   * The contents encoding ("utf8", etc.).
   *
   * @type {string}
   */
  name

  constructor(
    /**
     * The name of the file, including path.
     * @type {string}
     */
    name,
    /**
     * The contents encoding ("utf8", etc.)
     * @type {BufferEncoding}
     */
    encoding,
    /**
     * The file contents as text.
     * @type {string}
     */
    contents,
    /**
     * The date of last modification.
     * @type {Date}
     */
    lastModified,
    /**
     * Language info about the file.
     * @type {FileContentsLang}
     */
    lang
  ) {
    this.name = name
    this.encoding = encoding
    this.lang = lang
    this.lastModified = lastModified
    this._contents = contents
  }

  /**
   * @return {string}
   */
  get contents() {
    return this._contents
  }

  /**
   * @param {string} value
   */
  set contents(value) {
    this._contents = value
  }

  /**
   * Read a file to produce a SsgFile, or fail if the file doesn't exist.
   *
   * @param {string} fileName
   * @param {BufferEncoding} [declaredEncoding] The encoding for enforce, if any (if you know the guess will be wrong
   * for instance).
   * @return {FileContents}
   */
  static read(fileName, declaredEncoding)  {
    const fileStats = fs.statSync(fileName)
    const {encoding, contents} = FileContents.getContents(fileName, declaredEncoding)
    const langInfo = FileContents.getLang(fileName)
    return new FileContents(fileName, encoding, contents, fileStats.mtime, langInfo)
  }

  /**
   * Read a file or instantiate a brand new SsgFile if it doesn't exist.
   *
   * @param {string} fileName
   * @param {BufferEncoding} [declaredEncoding] The encoding for enforce, if any (if you know the guess will be wrong
   * for instance).
   * @return {FileContents}
   */
  static readOrNew(fileName, declaredEncoding) {
    try {
      return FileContents.read(fileName, declaredEncoding)
    } catch (e) {
      if (e.code === "ENOENT") {
        const lang = FileContents.getLang(fileName)
        return new FileContents(fileName, "utf8", "", new Date(), lang)
      } else {
        throw e
      }
    }
  }

  /**
   * Guess a file language and its language file variants in the same directory.
   *
   * @param {string} filePath The path of the file to guess language for.
   * @return {FileContentsLang}
   */
  static getLang(filePath) {
    const exec = FileContents.filePathRegex.exec(filePath)
    /** @type {string | undefined} */
    let lang
    /** @type {string[]} */
    let variants = []
    if (exec) {
      const dir = exec[1] ?? "."
      const fileName = exec[2]
      lang = exec[3] || ""
      const ext = exec[4]
      const files = fs.readdirSync(dir)
      const unique /** @type {Set<string>} */ = new Set(files
        .filter(f => f.startsWith(fileName) && f.endsWith(ext)) // Only with same filename prefix and same ext
        .map(f => {
          const fileExec = FileContents.fileRegex.exec(f)
          return fileExec ? fileExec[2] || "" : undefined
        })
        .filter(v => v !== void 0 && v !== lang)
      )
      variants = Array.from(unique)
    }
    return {lang, variants}
  }

  /**
   * Get the text contents of a file, and how it is encoded.
   *
   * @param {string} fileName
   * @param {BufferEncoding} [declaredEncoding] The encoding for enforce, if any (if you know the guess will be wrong
   * for instance).
   * @return {{ encoding: BufferEncoding; contents: string }}
   */
  static getContents(fileName, declaredEncoding)  {
    let detectedEncoding
    if (!declaredEncoding) {
      detectedEncoding = detectEncoding(fileName)
    }
    /** @type {BufferEncoding} */
    const encoding = declaredEncoding || detectedEncoding || "utf-8"
    const contents = fs.readFileSync(fileName, {encoding})
    return {encoding, contents}
  }

  /**
   * @return {Promise<void>}
   */
  async write() {
    return writeFile(this.name, this.contents, this.encoding)
  }
}
