import { Injectable } from "@nestjs/common"
import { PublishStatus } from "@prisma/client"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

@Injectable()
export class AdminService {
  changeApplicationPublishStatus(
    applicationId: string,
    publishStatus: PublishStatus
  ) {
    return prisma.application.update({
      where: { id: applicationId },
      data: { publishStatus }
    })
  }

  getAllApplications() {
    return prisma.application.findMany({
      where: {
        deletedAt: null
      }
    })
  }
}
