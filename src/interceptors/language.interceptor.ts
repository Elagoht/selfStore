import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common"
import Translator from "src/utils/Translator"

@Injectable()
export class LanguageInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest()
    request.acceptLanguage =
      request.headers["accept-language"] || Translator.FALLBACK_LOCALE
    return next.handle()
  }
}
