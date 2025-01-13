import { Injectable } from "@nestjs/common"
import { PrismaClient, PublishStatus } from "@prisma/client"
import Paginator from "src/utilities/Paginator"
import Transform from "src/utilities/Transform"

const prisma = new PrismaClient()

@Injectable()
export class AdminService {
  public changeApplicationPublishStatus(
    reverseDomain: string,
    publishStatus: PublishStatus
  ) {
    return prisma.application.update({
      where: { reverseDomain },
      data: { publishStatus }
    })
  }

  public async getAllApplications(page: number, take: number) {
    return await prisma.application.findMany({
      where: {
        deletedAt: null
      },
      ...new Paginator(page, take).paginate(),
      select: {
        ...Transform.toApplicationCardResponse
      }
    })
  }

  public approveDeveloper(username: string) {
    return this.changeDeveloperStatus(username, true)
  }

  public rejectDeveloper(username: string) {
    return this.changeDeveloperStatus(username, false)
  }

  private async changeDeveloperStatus(username: string, approved: boolean) {
    const developer = await prisma.developer.update({
      where: { username },
      data: { approved }
    })
    return {
      id: developer.id,
      approved: developer.approved
    }
  }
}
