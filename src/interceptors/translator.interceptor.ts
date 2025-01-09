import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor
} from "@nestjs/common"
import { Observable, throwError } from "rxjs"
import { catchError } from "rxjs/operators"
import Translator from "src/utils/Translator"

@Injectable()
export class TranslatorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof HttpException) {
          const { "accept-language": acceptLanguage } = context
            .switchToHttp()
            .getRequest().headers

          const translator = new Translator(acceptLanguage)

          const status = error.getStatus()
          const response = error.getResponse() as { message: string | string[] }

          const message =
            typeof response.message === "string"
              ? [translator.translate(response.message)]
              : response.message.map((message) => translator.translate(message))

          throw new HttpException(
            { message, status },
            status || HttpStatus.INTERNAL_SERVER_ERROR
          )
        }

        return throwError(() => error)
      })
    )
  }
}
