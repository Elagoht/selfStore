import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor
} from "@nestjs/common"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { Observable } from "rxjs"
import { catchError } from "rxjs/operators"
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException
} from "src/utilities/Exceptions"
import Printer from "src/utilities/Printer"

@Injectable()
export class PrismaInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        switch (true) {
          // Prisma error translation
          case error instanceof PrismaClientKnownRequestError:
            switch (error.code) {
              case "P2002":
                throw new ConflictException("errors.conflict")
              case "P2007":
                throw new BadRequestException("errors.badRequest")
              case "P2023":
                throw new NotFoundException("errors.notFound")
              case "P2025":
                throw new NotFoundException("errors.notFoundToProcess")
              default:
                Printer.error(error)
                throw new InternalServerErrorException("errors.internal")
            }
          // Allow manually thrown exceptions
          case error instanceof HttpException:
            Printer.error(error)
            throw error
          // Unhandled exceptions
          default:
            Printer.error(error)
            throw new InternalServerErrorException("errors.internal")
        }
      })
    )
  }
}
