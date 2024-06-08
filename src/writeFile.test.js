import test, { describe } from "node:test"
import { writeFile } from "./index.js"
import * as Assert from "node:assert"
import fs from "node:fs"

describe("writeFile", () => {

  test("undefined", async () => {
    const filePath = "test/written.txt"
    Assert.equal(fs.existsSync(filePath), false)
    await writeFile(filePath, "Written file\ncontents")
    try {
      await writeFile(filePath, "Written other \ncontents")
      Assert.equal(fs.existsSync(filePath), true)
    } finally {
      fs.unlinkSync(filePath)
    }
  })
})
