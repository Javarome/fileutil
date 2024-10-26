import { copyFile } from "./copyFile.mjs"

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
