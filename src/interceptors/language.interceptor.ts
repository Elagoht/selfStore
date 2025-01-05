import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common"
import { ApiHeader } from "@nestjs/swagger"

@Injectable()
@ApiHeader({
  name: "accept-language",
  required: false,
  description: "Language code (e.g., en, tr)",
  schema: {
    default: "en",
    enum: ["en", "tr"],
    type: "string"
  }
})
export class LanguageInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest()
    request.acceptLanguage = request.headers["accept-language"] || "en"
    return next.handle()
  }
}
