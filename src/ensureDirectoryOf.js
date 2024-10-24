import path from "node:path"
import fs from "fs"

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
