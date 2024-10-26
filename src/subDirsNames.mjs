import { subDirs } from "./subDirs.mjs"

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
