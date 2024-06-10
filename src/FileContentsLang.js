/**
 * Language info about a file.
 */
export default class FileContentsLang {
  /**
   * The detected language for the file ("fr" for instance).
   *
   * @type {string | undefined}
   */
  lang

  /**
   * Other variants detected in the file's directory (["fr", "en"] for instance).
   *
   * A variant is a file with the same name and extension in the same directory, but with a "_language" 2-letter suffix.
   *
   * [] if there are no variants. Will contain "" if there is a variant with no language suffix.
   *
   * @type {string[]}
   */
  variants
}
