import test, { describe } from "node:test"
import * as Assert from "node:assert"
import { detectEncoding } from "./detectEncoding.mjs"
import { detectContentsEncoding } from "./detectContentsEncoding.mjs"

describe("detectEncoding", () => {

  test("detectContentsEncoding", () => {
    Assert.equal(detectContentsEncoding("abc"), "UTF-32BE")
  })

  test("detectEncoding", () => {
    Assert.equal(detectEncoding("test/utf-8.txt"), "utf-8")
    Assert.equal(detectEncoding("test/iso-8859-1.txt"), "latin1")
  })
})
