import { ForbiddenException, Injectable } from "@nestjs/common"
import { PrismaClient, PublishStatus } from "@prisma/client"
import GoalKeeper from "src/utils/GoalKeeper"
import type Translator from "src/utils/Translator"
import { CreateApplicationDto } from "./dto/create-application.dto"

const prisma = new PrismaClient()

@Injectable()
export class ApplicationsService {
  async request(
    createApplicationDto: CreateApplicationDto,
    developerId: string,
    approved: boolean,
    translator: Translator
  ) {
    return await GoalKeeper.startShift(() => {
      if (!approved) {
        throw new ForbiddenException(
          translator.translate("modules.applications.errors.forbidden")
        )
      }

      return prisma.application.create({
        data: {
          ...createApplicationDto,
          publishStatus: PublishStatus.REQUESTED,
          permissions: [],
          developerId: developerId
        }
      })
    }, translator)
  }

  findAll(translator: Translator) {
    return GoalKeeper.startShift(() => {
      return prisma.application.findMany({
        where: {
          deletedAt: null,
          publishStatus: PublishStatus.PUBLISHED
        }
      })
    }, translator)
  }

  findByReverseDomain(reverseDomain: string, translator: Translator) {
    return GoalKeeper.startShift(() => {
      return prisma.application.findUnique({
        where: { reverseDomain }
      })
    }, translator)
  }
}
