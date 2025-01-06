import { Injectable } from "@nestjs/common"
import { PrismaClient, PublishStatus } from "@prisma/client"
import GoalKeeper from "src/utils/GoalKeeper"
import Translator from "src/utils/Translator"

const prisma = new PrismaClient()

@Injectable()
export class AdminService {
  public changeApplicationPublishStatus(
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

  public getAllApplications(translator: Translator) {
    return GoalKeeper.startShift(() => {
      return prisma.application.findMany({
        where: {
          deletedAt: null
        }
      })
    }, translator)
  }

  public approveDeveloper(developerId: string, translator: Translator) {
    return this.changeDeveloperStatus(developerId, true, translator)
  }

  public rejectDeveloper(developerId: string, translator: Translator) {
    return this.changeDeveloperStatus(developerId, false, translator)
  }

  private changeDeveloperStatus(
    developerId: string,
    approved: boolean,
    translator: Translator
  ) {
    return GoalKeeper.startShift(async () => {
      const developer = await prisma.developer.update({
        where: { id: developerId },
        data: { approved }
      })

      return {
        id: developer.id,
        approved: developer.approved
      }
    }, translator)
  }
}
