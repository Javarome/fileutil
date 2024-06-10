import test, { describe } from "node:test"
import * as Assert from "node:assert"
import * as fs from "node:fs"
import * as path from "node:path"
import ensureDirectoryOf from "./ensureDirectoryOf.js"

describe("ensureDirectoryOf", () => {

  const dirName = "test/subDir"

  test("test for subdir", () => {
    const filePath = path.join(dirName, "someFile.txt")
    const dirname = path.dirname(filePath)
    Assert.equal(fs.existsSync(dirname), false)
    const createdPath = ensureDirectoryOf(filePath)
    try {
      Assert.equal(filePath.endsWith(filePath), true)
      Assert.equal(ensureDirectoryOf(filePath).endsWith(filePath), true)
      Assert.equal(fs.existsSync(dirname), true)
    } finally {
      fs.rmdirSync(dirname)
    }
  })
})
