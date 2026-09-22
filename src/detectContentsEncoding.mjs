import { isAscii } from "buffer"
import { detectEncoding as _detectEncoding } from "char-encoding-detector"
import { toBufferEncoding } from "./toBufferEncoding.mjs"

/**
 * Detect the encoding of some contents.
 *
 * Pure-ASCII contents are UTF-8 (ASCII is a subset of it), whatever the detector would guess (typically
 * ISO-8859-1), so that non-ASCII text later added to them is not written in a legacy encoding.
 *
 * @param {Buffer | string} buffer The buffer holding the contents.
 */
export function detectContentsEncoding (buffer) {
  if (isAscii(typeof buffer === "string" ? Buffer.from(buffer) : buffer)) {
    return "utf-8"
  }
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
