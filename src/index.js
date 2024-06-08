import * as fs from "fs"
import { promises as fsAsync } from "fs"
import { readdir } from "fs/promises"
import { detectEncoding as _detectEncoding } from "char-encoding-detector"
import { promise as glob } from "glob-promise"
import { Dirent } from "node:fs"
import * as path from "node:path"

/**
 * Converts encoding names to Node's buffer encoding names.
 *
 * @param {string | undefined} encoding The encoding name ("iso-8859-1", "windows-1252", etc.)
 * @return {BufferEncoding | undefined} The matching BufferEncoding, or undefined if not supported.
 */
export function toBufferEncoding (encoding) {
  switch (encoding?.toLowerCase()) {
    case "utf-8":
      return "utf-8"
    case "iso-8859-1":
    case "iso-8859-2":
    case "windows-1252":
    case "windows-1253":
    case "IBM424_ltr":
      return "latin1"
    default:
      return encoding ? /** @type {BufferEncoding} */ encoding : undefined
  }
}

/**
 * Detect the encoding of some file contents.
 *
 * @param {string} filePath The path of the file to read.
 * @return {BufferEncoding | undefined} The matching BufferEncoding, or undefined if not supported.
 */
export function detectEncoding (filePath) {
  const fileBuffer = fs.readFileSync(filePath)
  return detectContentsEncoding(fileBuffer)
}

/**
 * Detect the encoding of some contents.
 *
 * @param {Buffer} buffer The buffer holding the contents.
 */
export function detectContentsEncoding (buffer) {
  let guessedEncoding = undefined
  try {
    guessedEncoding = _detectEncoding(buffer)
  } catch (e) {
    if (e.message !== "Failed to detect charset.") {
      throw e
    }
  }
  if (guessedEncoding) {
    return toBufferEncoding(guessedEncoding)
  }
}

/**
 * Checks if a directory exists and, if not, creates it.
 *
 * @param {string} filePath The path of the directory that must exist.
 * @return {string} The resolved absolute file path.
 */
export function ensureDirectoryOf (filePath) {
  const dirname = path.dirname(filePath)
  if (!fs.existsSync(dirname)) {
    ensureDirectoryOf(dirname) // Recursive to create the whole directories chain.
    fs.mkdirSync(dirname)
  }
  return path.resolve(filePath)
}

/**
 * Writes a file. If the file directory doesn't exit, it is created.
 *
 * @param {string} filePath The path of the file to write.
 * @param {string} contents The file contents to write.
 * @param {BufferEncoding} encoding The file contents encoding scheme.
 * @return {Promise<void>}
 */
export async function writeFile (filePath, contents, encoding) {
  ensureDirectoryOf(filePath)
  await fsAsync.writeFile(filePath, contents, { encoding })
}

/**
 * Get a list of subdirectories.
 *
 * @param {string} fromDir The name of the root directory to look from.
 * @return {Promise<Dirent[]>}
 */
export async function subDirs (fromDir) {
  const dirs = await readdir(fromDir, { withFileTypes: true })
  return dirs.filter(dirEntry => dirEntry.isDirectory())
}

/**
 * Get a list of subdirectories' names.
 *
 * @param {string} fromDir The name of the root directory to look from.
 * @return {Promise<string[]>}
 */
export async function subDirsNames (fromDir) {
  const dirs = await subDirs(fromDir)
  return dirs.map(dirEntry => dirEntry.name)
}

/**
 * Find sub-directories of a set of dirs.
 *
 * @param {string[]} fromDirs
 * @param {string[]} excludedDirs
 * @return {Promise<string[]>}
 */
export async function findDirs (fromDirs, excludedDirs = []) {
  let dirNames = []
  for (let fromDir of fromDirs) {
    const subDirs = await findSubDirs(fromDir, excludedDirs)
    dirNames = dirNames.concat(subDirs)
  }
  return dirNames
}

/**
 * Find sub-directories of a set of dirs.
 *
 * @param {string} ofDir
 * @param {string[]} excludedDirs
 * @return {Promise<string[]>}
 */
export async function findSubDirs (ofDir, excludedDirs = []) {
  /** @type {string[]} */
  let subDirs = []
  if (ofDir.endsWith("/*/")) {
    const baseDir = ofDir.substring(0, ofDir.length - 3)
    if (baseDir.endsWith("/*")) {
      const dirs = (await findDirs([baseDir + "/"]))
        .filter(dirName => !excludedDirs.includes(dirName))
      for (const dir of dirs) {
        subDirs = subDirs.concat(await findDirs([dir + "/*/"]))
      }
    } else {
      subDirs = (await subDirsNames(baseDir)).map(x => path.join(baseDir, x))
    }
  } else {
    subDirs = [ofDir]
  }
  return subDirs
}

/**
 * Copy files to a destination directory.
 *
 * @param {string} toDir the destination directory path.
 * @param {string[]} sourcePatterns An array of file nmes.
 * @param {IOptions} options
 * @return {Promise<string[]>} the list of output files.
 */
export async function copy (toDir, sourcePatterns, options = undefined) {
  /** @type {string[]} */
  let result = []
  for (const sourcePattern of sourcePatterns) {
    const sourceFiles = await glob(sourcePattern, options)
    const copied = copyFiles(sourceFiles, toDir)
    result = result.concat(copied)
  }
  return result
}

/**
 * Copy multiple files to a directory.
 *
 * @param {string[]} sourceFiles
 * @param {string} toDir
 * @return {string[]}
 */
export function copyFiles (sourceFiles, toDir) {
  /** @type {string[]} */
  const result = []
  for (const sourceFile of sourceFiles) {
    const to = copyFile(sourceFile, toDir)
    result.push(to)
  }
  return result
}

/**
 * Copy a file to a directory.
 *
 * @param {string} sourceFilePath
 * @param {string} destDir
 * @return {string | *}
 */
export function copyFile (sourceFilePath, destDir) {
  const fromPath = path.resolve(sourceFilePath)
  const toPath = path.resolve(destDir, sourceFilePath)
  ensureDirectoryOf(toPath)
  fs.copyFileSync(fromPath, toPath)
  return toPath
}

export * from "./FileContents.js"
