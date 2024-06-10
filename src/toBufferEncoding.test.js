import test, { describe } from "node:test"
import * as Assert from "node:assert"
import toBufferEncoding from "./toBufferEncoding.js"

describe("toBufferEncoding", () => {

  test("undefined", () => {
    Assert.equal(toBufferEncoding(undefined), undefined)
  })

  test("utf-8", () => {
    Assert.equal(toBufferEncoding("utf-8"), "utf-8")
  })

  test("iso-8859-1", () => {
    Assert.equal(toBufferEncoding("iso-8859-1"), "latin1")
  })
})
