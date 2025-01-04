import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException
} from "@nestjs/common"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

class GoalKeeper {
  public static async startShift(job: () => Promise<any>) {
    try {
      return await job()
    } catch (error) {
      switch (true) {
        case error instanceof PrismaClientKnownRequestError:
          switch (error.code) {
            case "P2002":
              throw new ConflictException("Conflict, resource already exists")
            case "P2007":
              throw new BadRequestException("Bad Request, invalid data")
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
