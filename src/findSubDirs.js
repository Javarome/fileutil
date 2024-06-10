import path from "node:path"
import findDirs from "./findDirs.js"
import subDirsNames from "./subDirsNames.js"

/**
 * Find subdirectories of a set of dirs.
 *
 * @param {string} rootDir
 * @param {string[]} excludedDirs
 * @return {Promise<string[]>}
 */
export default async function findSubDirs (rootDir, excludedDirs = []) {
  /** @type {string[]} */
  let subDirs = []
  if (rootDir.endsWith("/*/")) {
    const baseDir = rootDir.substring(0, rootDir.length - 3)
    if (baseDir.endsWith("/*")) {
      const dirs = (await findDirs([baseDir + "/"]))
        .filter(dirName => !excludedDirs.includes(dirName))
      for (const dir of dirs) {
        subDirs = subDirs.concat(await findDirs([dir + "/*/"]))
      }
    } else {
      const subDirNames = await subDirsNames(baseDir)
      subDirs = subDirNames.map(x => path.join(baseDir, x))
    }
  } else {
    subDirs = [rootDir]
  }
  return subDirs
}
