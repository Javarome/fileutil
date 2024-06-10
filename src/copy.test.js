import test, { describe } from "node:test"
import fs from "node:fs"
import * as path from "node:path"
import * as assert from "node:assert"
import copyFile from "./copyFile.js"
import copyFiles from "./copyFiles.js"

describe("copy", () => {

  const srcDir = "test"
  const destDir = "dest"

  const filePath1 = "utf-8.txt"
  const srcPath1 = path.join(srcDir, filePath1)
  const destPath1 = path.resolve(path.join(destDir, filePath1))

  const filePath2 = "iso-8859-1.txt"
  const srcPath2 = path.join(srcDir, filePath2)
  const destPath2 = path.resolve(path.join(destDir, filePath2))

  test("copyFile", async () => {
    assert.equal(fs.existsSync(destPath1), false)
    const outPath1 = await copyFile(srcPath1, destDir)
    try {
      assert.equal(fs.existsSync(outPath1), true)
    } finally {
      fs.unlinkSync(outPath1)
      fs.rmdirSync(path.dirname(outPath1))
      fs.rmdirSync(destDir)
    }
  })

  test("copyFiles", async () => {
    assert.equal(fs.existsSync(destPath1), false)
    assert.equal(fs.existsSync(destPath2), false)
    const [outPath1, outPath2] = copyFiles([srcPath1, srcPath2], destDir)
    try {
      assert.equal(fs.existsSync(outPath1), true)
      assert.equal(fs.existsSync(outPath2), true)
    } finally {
      fs.unlinkSync(outPath1)
      fs.unlinkSync(outPath2)
      fs.rmdirSync(path.dirname(outPath1))
      fs.rmdirSync(destDir)
    }
  })
})
