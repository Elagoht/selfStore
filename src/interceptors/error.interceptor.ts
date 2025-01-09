import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NestInterceptor
} from "@nestjs/common"
import { Observable } from "rxjs"
import { catchError } from "rxjs/operators"
import Printer from "src/utils/Printer"

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        switch (true) {
          case error instanceof HttpException:
            throw error
          default:
            Printer.warn("This is an unhandled error!")
            Printer.error(error)
            throw new InternalServerErrorException({
              message: "errors.internal",
              status: HttpStatus.INTERNAL_SERVER_ERROR
            })
        }
      })
    )
  }
}
