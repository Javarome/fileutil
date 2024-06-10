import copyFiles from "./copyFiles.js"
import { promise as glob } from "glob-promise"

/**
 * Copy files to a destination directory.
 *
 * @param {string} toDir the destination directory path.
 * @param {string[]} sourcePatterns An array of file nmes.
 * @param {IOptions} options
 * @return {Promise<string[]>} the list of output files.
 */
export default async function copy (toDir, sourcePatterns, options = undefined) {
  /** @type {string[]} */
  let result = []
  for (const sourcePattern of sourcePatterns) {
    const sourceFiles = await glob(sourcePattern, options)
    const copied = copyFiles(sourceFiles, toDir)
    result = result.concat(copied)
  }
  return result
}
