import { Injectable } from "@nestjs/common"
import { PrismaClient, PublishStatus } from "@prisma/client"
import GoalKeeper from "src/utils/GoalKeeper"
import Translator from "src/utils/Translator"

const prisma = new PrismaClient()

@Injectable()
export class AdminService {
  changeApplicationPublishStatus(
    applicationId: string,
    publishStatus: PublishStatus,
    translator: Translator
  ) {
    return GoalKeeper.startShift(() => {
      return prisma.application.update({
        where: { id: applicationId },
        data: { publishStatus }
      })
    }, translator)
  }

  changeDeveloperStatus(
    developerId: string,
    approved: boolean,
    translator: Translator
  ) {
    return GoalKeeper.startShift(() => {
      return prisma.developer.update({
        where: { id: developerId },
        data: { approved }
      })
    }, translator)
  }

  getAllApplications(translator: Translator) {
    return GoalKeeper.startShift(() => {
      return prisma.application.findMany({
        where: {
          deletedAt: null
        }
      })
    }, translator)
  }
}
