import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException
} from "@nestjs/common"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import type Translator from "../Translator"

class GoalKeeper {
  public static async startShift(
    job: () => Promise<any>,
    translator: Translator
  ) {
    try {
      return await job()
    } catch (error) {
      switch (true) {
        case error instanceof PrismaClientKnownRequestError:
          switch (error.code) {
            case "P2002":
              throw new ConflictException(
                translator.translate("common.errors.conflict")
              )
            case "P2007":
              throw new BadRequestException(
                translator.translate("common.errors.badRequest")
              )
            default:
              throw new InternalServerErrorException("Internal Server Error")
          }
        case error instanceof Error:
          throw error
        default:
          throw new InternalServerErrorException("Internal Server Error")
      }
    }
  }
}

export default GoalKeeper
