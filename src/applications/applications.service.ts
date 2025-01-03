import { Injectable } from "@nestjs/common"
import { CreateApplicationDto } from "./dto/create-application.dto"
import { PrismaClient, PublishStatus } from "@prisma/client"

const prisma = new PrismaClient()

@Injectable()
export class ApplicationsService {
  create(createApplicationDto: CreateApplicationDto) {
    return prisma.application.create({
      data: {
        ...createApplicationDto,
        publishStatus: PublishStatus.REQUESTED,
        permissions: []
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
