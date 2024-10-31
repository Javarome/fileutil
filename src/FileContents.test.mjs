import test, { describe } from "node:test"
import * as assert from "node:assert"
import { FileContents } from "./FileContents.mjs"

describe('SsgFile', () => {

  test('lang', () => {
    const langDefault = FileContents.getLang("test/utf-8.txt");
    assert.deepEqual(langDefault, {lang: '', variants: ['en', 'fr']});

    const langFr = FileContents.getLang("test/utf-8_fr.txt");
    assert.deepEqual(langFr, {lang: 'fr', variants: ['en']});
  });

  test('lang with no path', () => {
    const langNoDir = FileContents.getLang("LICENSE");
    assert.deepEqual(langNoDir, {lang: undefined, variants: []});
  });

  test('files', () => {
    const langFr = FileContents.getLang("test/utf-8_fr.txt");
    assert.deepEqual(langFr, {lang: 'fr', variants: ['en']});

    const fileDefault = FileContents.read("test/utf-8.txt");
    assert.deepEqual(fileDefault.lang, {lang: '', variants: ['en', 'fr']});

    const langEn = FileContents.read("test/utf-8_en.txt");
    assert.deepEqual(langEn.lang, {lang: 'en', variants: ['fr']});
  });
});
