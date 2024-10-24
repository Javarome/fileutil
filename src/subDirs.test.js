import test, { describe } from "node:test"
import * as fs from "node:fs"
import * as assert from "node:assert"
import { subDirs } from "./subDirs.js"
import { subDirsNames } from "./subDirsNames.js"

describe("subDirs", () => {

  const subDir1 = "test/subDir1"
  const subDir2 = "test/subDir2"
  const subDir11 = "test/subDir1/subDir11"

  test("test for subdir", async () => {
    assert.deepEqual(await subDirs("test"), [])
    fs.mkdirSync(subDir1)
    try {
      assert.deepEqual(await subDirsNames("test"), ["subDir1"])
      fs.mkdirSync(subDir2)
      try {
        assert.deepEqual(await subDirsNames("test"), ["subDir1", "subDir2"])
        fs.mkdirSync(subDir11)
        try {
          assert.deepEqual(await subDirsNames("test"), ["subDir1", "subDir2"])
          assert.deepEqual(await subDirsNames(subDir1), ["subDir11"])
        } finally {
          fs.rmdirSync(subDir11)
        }
      } finally {
        fs.rmdirSync(subDir2)
      }
    } finally {
      fs.rmdirSync(subDir1)
    }
  })
})
