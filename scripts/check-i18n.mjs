import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const localeFiles = ["sv", "en", "ar"];

async function loadDictionary(locale) {
  const file = resolve(`lib/i18n/dictionaries/${locale}.js`);
  const source = await readFile(file, "utf8");
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
  return (await import(moduleUrl)).default;
}

function compareShape(reference, candidate, path = "dictionary") {
  const referenceIsArray = Array.isArray(reference);
  const candidateIsArray = Array.isArray(candidate);

  if (referenceIsArray || candidateIsArray) {
    if (!referenceIsArray || !candidateIsArray || reference.length !== candidate.length) {
      throw new Error(`${path}: array shape differs`);
    }
    reference.forEach((value, index) => compareShape(value, candidate[index], `${path}[${index}]`));
    return;
  }

  if (reference && typeof reference === "object") {
    if (!candidate || typeof candidate !== "object") {
      throw new Error(`${path}: expected an object`);
    }
    const referenceKeys = Object.keys(reference).sort();
    const candidateKeys = Object.keys(candidate).sort();
    if (JSON.stringify(referenceKeys) !== JSON.stringify(candidateKeys)) {
      throw new Error(`${path}: keys differ`);
    }
    referenceKeys.forEach((key) => compareShape(reference[key], candidate[key], `${path}.${key}`));
    return;
  }

  if (typeof reference !== typeof candidate) {
    throw new Error(`${path}: expected ${typeof reference}, received ${typeof candidate}`);
  }

  if (typeof candidate === "string" && candidate.includes("\uFFFD")) {
    throw new Error(`${path}: contains a Unicode replacement character`);
  }
}

const dictionaries = Object.fromEntries(
  await Promise.all(localeFiles.map(async (locale) => [locale, await loadDictionary(locale)])),
);

for (const locale of localeFiles.slice(1)) {
  compareShape(dictionaries.sv, dictionaries[locale], locale);
}

console.log("i18n dictionaries: schema and Unicode checks passed for sv, en and ar");
