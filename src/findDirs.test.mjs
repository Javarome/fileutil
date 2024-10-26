import test, { describe } from "node:test"
import * as fs from "node:fs"
import * as assert from "node:assert"
import { findDirs } from "./findDirs.mjs"

describe("findDirs", () => {

  const subDir1 = "test/subDir1"
  const subDir2 = "test/subDir2"
  const subDir11 = "test/subDir1/subDir11"

  test("root", async () => {
    assert.deepEqual(await findDirs(["test/"]), ["test/"])
  })

  test("findDirs", async () => {
    let dirsUnderRoot = "test/*/"
    assert.deepEqual(await findDirs([dirsUnderRoot]), [])
    fs.mkdirSync(subDir1)
    try {
      assert.deepEqual(await findDirs([dirsUnderRoot]), [subDir1])
      fs.mkdirSync(subDir2)
      try {
        assert.deepEqual(await findDirs([dirsUnderRoot]), [subDir1, subDir2])
        fs.mkdirSync(subDir11)
        try {
          assert.deepEqual(await findDirs([dirsUnderRoot]), [subDir1, subDir2])
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
