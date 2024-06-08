import test, { after, describe } from "node:test"
import { subDirs, subDirsNames } from "./index.js"
import * as fs from "node:fs"
import * as assert from "node:assert"

describe("subDirs", () => {

  const dirName1 = "test/subDir1"
  const dirName2 = "test/subDir2"
  const dirName11 = "test/subDir1/subDir11"

  test("test for subdir", async () => {
    assert.deepEqual(await subDirs("test"), [])
    fs.mkdirSync(dirName1)
    assert.deepEqual(await subDirsNames("test"), ["subDir1"])
    fs.mkdirSync(dirName2)
    assert.deepEqual(await subDirsNames("test"), ["subDir1", "subDir2"])
    fs.mkdirSync(dirName11)
    assert.deepEqual(await subDirsNames("test"), ["subDir1", "subDir2"])
    assert.deepEqual(await subDirsNames(dirName1), ["subDir11"])
  })

  after(() => {
    fs.rmdirSync(dirName11)
    fs.rmdirSync(dirName1)
    fs.rmdirSync(dirName2)
  })
})
