import { readdir } from "fs/promises"

/**
 * Get a list of subdirectories.
 *
 * @param {string} fromDir The name of the root directory to look from.
 * @return {Promise<Dirent[]>}
 */
export default async function subDirs (fromDir) {
  const dirs = await readdir(fromDir, { withFileTypes: true })
  return dirs.filter(dirEntry => dirEntry.isDirectory())
}
