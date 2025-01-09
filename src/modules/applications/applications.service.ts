import { ForbiddenException, Injectable } from "@nestjs/common"
import { PrismaClient, PublishStatus } from "@prisma/client"
import { DeveloperService } from "../developer/developer.service"
import { CreateApplicationDto } from "./dto/create-application.dto"

const prisma = new PrismaClient()

@Injectable()
export class ApplicationsService {
  request(createApplicationDto: CreateApplicationDto, developerId: string) {
    if (!DeveloperService.isApproved(developerId))
      throw new ForbiddenException("modules.applications.errors.forbidden")

    return prisma.application.create({
      data: {
        ...createApplicationDto,
        publishStatus: PublishStatus.REQUESTED,
        permissions: [],
        developerId: developerId
      }
    })
  }

  findAll() {
    return prisma.application.findMany({
      where: {
        deletedAt: null,
        publishStatus: PublishStatus.PUBLISHED
      }
    })
  }

  findByReverseDomain(reverseDomain: string) {
    return prisma.application.findUnique({
      where: { reverseDomain }
    })
  }
}
