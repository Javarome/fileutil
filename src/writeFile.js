import { promises as fsAsync } from "fs"
import { ensureDirectoryOf } from "./ensureDirectoryOf.js"

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
