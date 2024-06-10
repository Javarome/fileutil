import subDirs from "./subDirs.js"

/**
 * Get a list of subdirectories' names.
 *
 * @param {string} fromDir The name of the root directory to look from.
 * @return {Promise<string[]>}
 */
export default async function subDirsNames (fromDir) {
  const dirs = await subDirs(fromDir)
  return dirs.map(dirEntry => dirEntry.name)
}
