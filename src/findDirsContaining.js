import { globSync } from "glob"

/**
 * @param {string} fileName
 * @param {string} exclude
 * @return {string[]}
 */
export function findDirsContaining (fileName, exclude = "") {
  function onlyUnique (value, index, self) {
    return self.indexOf(value) === index
  }

  return (globSync(`!(${exclude})/**/${fileName}`))
    .map(path => path.substring(0, path.lastIndexOf("/")))
    .filter(onlyUnique)
}
