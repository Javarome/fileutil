import fs from "fs"
import detectContentsEncoding from "./detectContentsEncoding.js"

/**
 * Detect the encoding of some file contents.
 *
 * @param {string} filePath The path of the file to read.
 * @return {BufferEncoding | undefined} The matching BufferEncoding, or undefined if not supported.
 */
export default function detectEncoding (filePath) {
  const fileBuffer = fs.readFileSync(filePath)
  return detectContentsEncoding(fileBuffer)
}
