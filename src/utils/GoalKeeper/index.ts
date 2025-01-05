import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException
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
            case "P2023":
              throw new NotFoundException(
                translator.translate("common.errors.notFound")
              )
            default:
              throw new InternalServerErrorException(
                translator.translate("common.errors.internal")
              )
          }
        default:
          throw new InternalServerErrorException(
            translator.translate("common.errors.internal")
          )
      }
    }
  }
}

export default GoalKeeper
