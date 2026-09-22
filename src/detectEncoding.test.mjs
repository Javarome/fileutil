import test, { describe } from "node:test"
import * as Assert from "node:assert"
import { detectEncoding } from "./detectEncoding.mjs"
import { detectContentsEncoding } from "./detectContentsEncoding.mjs"

describe("detectEncoding", () => {

  test("detectContentsEncoding", () => {
    Assert.equal(detectContentsEncoding("abc"), "utf-8")
    Assert.equal(detectContentsEncoding(Buffer.from("<p>ASCII only</p>", "latin1")), "utf-8")
    Assert.equal(detectContentsEncoding(Buffer.from("Début de l'article, déjà écrit en ISO-8859-1", "latin1")), "latin1")
  })

  test("detectEncoding", () => {
    Assert.equal(detectEncoding("test/utf-8.txt"), "utf-8")
    Assert.equal(detectEncoding("test/iso-8859-1.txt"), "latin1")
  })
})
