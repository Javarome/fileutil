import { detectEncoding as _detectEncoding } from "char-encoding-detector"

import { toBufferEncoding } from "./toBufferEncoding.js"

/**
 * Detect the encoding of some contents.
 *
 * @param {Buffer} buffer The buffer holding the contents.
 */
export function detectContentsEncoding (buffer) {
  let guessedEncoding = undefined
  try {
    guessedEncoding = _detectEncoding(buffer)
  } catch (e) {
    if (e.message !== "Failed to detect charset.") {
      throw e
    }
  }
  if (guessedEncoding) {
    return toBufferEncoding(guessedEncoding)
  }
}
