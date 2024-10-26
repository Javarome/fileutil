/**
 * Converts encoding names to Node's buffer encoding names.
 *
 * @param {string | undefined} encoding The encoding name ("iso-8859-1", "windows-1252", etc.)
 * @return {BufferEncoding | undefined} The matching BufferEncoding, or undefined if not supported.
 */
export function toBufferEncoding (encoding) {
  switch (encoding?.toLowerCase()) {
    case "utf-8":
      return "utf-8"
    case "iso-8859-1":
    case "iso-8859-2":
    case "windows-1252":
    case "windows-1253":
    case "IBM424_ltr":
      return "latin1"
    default:
      return encoding ? /** @type {BufferEncoding} */ encoding : undefined
  }
}
