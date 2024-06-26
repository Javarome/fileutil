import test, { describe } from "node:test"
import * as fs from "node:fs"
import * as assert from "node:assert"
import subDirs from "./subDirs.js"
import subDirsNames from "./subDirsNames.js"

describe("subDirs", () => {

  const dirName1 = "test/subDir1"
  const dirName2 = "test/subDir2"
  const dirName11 = "test/subDir1/subDir11"

  test("test for subdir", async () => {
    assert.deepEqual(await subDirs("test"), [])
    fs.mkdirSync(dirName1)
    try {
      assert.deepEqual(await subDirsNames("test"), ["subDir1"])
      fs.mkdirSync(dirName2)
      try {
        assert.deepEqual(await subDirsNames("test"), ["subDir1", "subDir2"])
        fs.mkdirSync(dirName11)
        try {
          assert.deepEqual(await subDirsNames("test"), ["subDir1", "subDir2"])
          assert.deepEqual(await subDirsNames(dirName1), ["subDir11"])
        } finally {
          fs.rmdirSync(dirName11)
        }
      } finally {
        fs.rmdirSync(dirName2)
      }
    } finally {
      fs.rmdirSync(dirName1)
    }
  })
})
