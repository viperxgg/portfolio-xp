import "server-only";
import sv from "./dictionaries/sv";
import en from "./dictionaries/en";
import ar from "./dictionaries/ar";

const dictionaries = { sv, en, ar };

export function getDictionary(locale) {
  return dictionaries[locale] || dictionaries.sv;
}
