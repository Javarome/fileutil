import path from "node:path"
import fs from "fs"

import { ensureDirectoryOf } from "./ensureDirectoryOf.js"

/**
 * Copy a file to a directory.
 *
 * @param {string} sourceFilePath
 * @param {string} destDir
 * @return {string | *}
 */
export function copyFile (sourceFilePath, destDir) {
  const fromPath = path.resolve(sourceFilePath)
  const toPath = path.resolve(destDir, sourceFilePath)
  ensureDirectoryOf(toPath)
  fs.copyFileSync(fromPath, toPath)
  return toPath
}
