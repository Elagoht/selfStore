import en from "src/i18n/en.json"
import tr from "src/i18n/tr.json"

declare global {
  // All dictionaries must have the same structure
  type LangFileSchema = typeof en
}

import { parse } from "accept-language-parser"

class Translator {
  public locale: Locale
  public static readonly LOCALES: Locale[] = ["en", "tr"]
  public static readonly FALLBACK_LOCALE: Locale = "en"

  public constructor(acceptedLanguage: string | null) {
    this.locale = Translator.determineLanguage(acceptedLanguage)
  }

  /**
   * Parse the period separated key and return the translated value
   *
   * @param pattern - The key + | + modifier=value
   * @returns The translated value
   * @example
   * ```ts
   * const translator = new Translator("en")
   * const translated = translator.translate("errors.notFound")
   * console.log(translated) // "Resource not found"
   *
   * const translated = translator.translate("errors.generics.conflict|entity=MyUserName")
   * console.log(translated) // "MyUserName already exists"
   * ```
   */
  public translate(pattern: string): string {
    const dictionary = Translator.getDictionary(this.locale)
    const [key, modifier] = pattern.split("|")

    const keys = key.split(".")

    const message = keys.reduce((obj: any, key: string) => {
      if (obj && typeof obj === "object" && key in obj) {
        return obj[key]
      }
      return key
    }, dictionary)

    return modifier ? Translator.modify(message, modifier) : message
  }

  private static modify(message: string, modifier: string): string {
    const sanitizedModifiers = Translator.sanitizeModifiers(modifier)

    let result = message
    Object.entries(sanitizedModifiers).forEach(([key, value]) => {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g")
      result = result.replace(regex, value)
    })

    return result
  }

  /**
   * Modifier string is a simple comma separated list of key=value pairs
   * @param modifier - The modifier string
   * @returns The sanitized modifier string
   */
  private static sanitizeModifiers(modifier: string): Record<string, string> {
    return modifier.split(",").reduce(
      (collection, pair) => {
        const [key, value] = pair.split("=")
        collection[key] = value
        return collection
      },
      {} as Record<string, string>
    )
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

  private static readonly DICTIONARIES: Record<Locale, LangFileSchema> = {
    en,
    tr
  }
}

export default Translator
