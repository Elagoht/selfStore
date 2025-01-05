import { Headers } from "@nestjs/common"
import { ApiHeader } from "@nestjs/swagger"

// Class decorator to apply API documentation
export const ApiAcceptLanguageHeader = () =>
  ApiHeader({
    name: "accept-language",
    required: false,
    description: "Language code (e.g., en, tr)",
    example: "en",
    schema: {
      default: "en",
      enum: ["en", "tr"],
      type: "string"
    }
  })

// Parameter decorator for handling the header
export const AcceptLanguage = () => Headers("accept-language")
