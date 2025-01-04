import en from "src/i18n/en.json"
import tr from "src/i18n/tr.json"

declare global {
  // All dictionaries must have the same structure
  type Dictionary = typeof en
}

import { parse } from "accept-language-parser"

class Translator {
  public locale: Locale

  public constructor(acceptedLanguage: string | null) {
    this.locale = Translator.determineLanguage(acceptedLanguage)
  }

  /**
   * Parse the period separated key and return the translated value
   *
   * @param key - The key to translate
   * @returns The translated value
   * @example
   * ```ts
   * const translator = new Translator("en")
   * const translated = translator.translate("common.errors.notFound")
   * console.log(translated) // "Resource not found"
   * ```
   */
  public translate(key: string): string {
    const dictionary = Translator.getDictionary(this.locale)
    const keys = key.split(".")

    return keys.reduce((obj: any, key: string) => {
      if (obj && typeof obj === "object" && key in obj) {
        return obj[key]
      }
      throw new Error(`Translation key "${key}" not found`)
    }, dictionary)
  }

  private static determineLanguage(acceptedLanguage: string | null): Locale {
    const language = parse(acceptedLanguage || Translator.FALLBACK_LOCALE)
    const locale = language[0]?.code

    if (this.isLocaleAccepted(locale)) return locale as Locale

    return Translator.FALLBACK_LOCALE
  }

  private static isLocaleAccepted(locale: string) {
    return Translator.LOCALES.includes(locale as Locale)
  }

  private static getDictionary(locale: Locale) {
    return Translator.DICTIONARIES[locale]
  }

  private static readonly LOCALES: Locale[] = ["en", "tr"]

  private static readonly FALLBACK_LOCALE: Locale = "en"

  private static readonly DICTIONARIES: Record<Locale, Dictionary> = {
    en,
    tr
  }
}

export default Translator
