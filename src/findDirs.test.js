import test, { describe } from "node:test"
import * as fs from "node:fs"
import * as assert from "node:assert"
import findDirs from "./findDirs.js"

describe("findDirs", () => {

  const dirName1 = "test/subDir1"
  const dirName2 = "test/subDir2"
  const dirName11 = "test/subDir1/subDir11"

  test("root", async () => {
    assert.deepEqual(await findDirs(["test/"]), ["test/"])
  })

  test("findDirs", async () => {
    let dirsUnderRoot = "test/*/"
    assert.deepEqual(await findDirs([dirsUnderRoot]), [])
    fs.mkdirSync(dirName1)
    try {
      assert.deepEqual(await findDirs([dirsUnderRoot]), [dirName1])
      fs.mkdirSync(dirName2)
      try {
        assert.deepEqual(await findDirs([dirsUnderRoot]), [dirName1, dirName2])
        fs.mkdirSync(dirName11)
        try {
          assert.deepEqual(await findDirs([dirsUnderRoot]), [dirName1, dirName2])
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
