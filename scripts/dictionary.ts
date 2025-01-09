/* eslint-disable no-console */

import fs from "fs/promises"

async function generateDictionaryTypes() {
  try {
    const enFile = await fs.readFile("src/i18n/en.json", "utf-8")
    const enData = JSON.parse(enFile)

    // Function to recursively generate keys
    function generateKeys(obj: any, prefix = ""): string[] {
      return Object.keys(obj).flatMap((key) => {
        const newPrefix = prefix ? `${prefix}.${key}` : key
        return typeof obj[key] === "object"
          ? generateKeys(obj[key], newPrefix)
          : newPrefix
      })
    }

    const keys = generateKeys(enData)
    const typeDefinition = `type Dictionary =\n  | ${keys.map((key) => `"${key}"`).join("\n  | ")}\n`

    // Write the type definition to a file
    await fs.writeFile("src/types/dictionary.d.ts", typeDefinition, "utf-8")

    console.log("✅ Dictionary types generated successfully!")
  } catch (error) {
    console.error(
      `❌ Error generating dictionary types: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    )
    process.exit(1)
  }
}

generateDictionaryTypes()
