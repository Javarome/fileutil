import findSubDirs from "./findSubDirs.js"

/**
 * Find subdirectories of a set of dirs.
 *
 * @param {string[]} fromDirs
 * @param {string[]} excludedDirs
 * @return {Promise<string[]>}
 */
export default async function findDirs (fromDirs, excludedDirs = []) {
  let dirNames = []
  for (let fromDir of fromDirs) {
    const subDirs = await findSubDirs(fromDir, excludedDirs)
    dirNames = dirNames.concat(subDirs)
  }
  return dirNames
}
