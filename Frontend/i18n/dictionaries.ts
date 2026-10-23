import type { Locale } from "./config";
import uz from "@/messages/uz.json";
import ru from "@/messages/ru.json";
import en from "@/messages/en.json";

export type Dictionary = typeof uz;

const dictionaries: Record<Locale, Dictionary> = {
  uz,
  ru,
  en,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.uz;
}
