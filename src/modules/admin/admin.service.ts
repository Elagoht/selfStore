import { Injectable } from "@nestjs/common"
import { PrismaClient, PublishStatus } from "@prisma/client"

const prisma = new PrismaClient()

@Injectable()
export class AdminService {
  public changeApplicationPublishStatus(
    applicationId: string,
    publishStatus: PublishStatus
  ) {
    return prisma.application.update({
      where: { id: applicationId },
      data: { publishStatus }
    })
  }

  public getAllApplications() {
    return prisma.application.findMany({
      where: {
        deletedAt: null
      }
    })
  }

  public approveDeveloper(developerId: string) {
    return this.changeDeveloperStatus(developerId, true)
  }

  public rejectDeveloper(developerId: string) {
    return this.changeDeveloperStatus(developerId, false)
  }

  private async changeDeveloperStatus(developerId: string, approved: boolean) {
    const developer = await prisma.developer.update({
      where: { id: developerId },
      data: { approved }
    })

    return {
      id: developer.id,
      approved: developer.approved
    }
  }
}
