import { ConflictException, Injectable } from "@nestjs/common"
import { PrismaClient, PublishStatus } from "@prisma/client"
import { CreateApplicationDto } from "./dto/create-application.dto"

const prisma = new PrismaClient()

@Injectable()
export class ApplicationsService {
  async create(
    createApplicationDto: CreateApplicationDto,
    developerId: string
  ) {
    const existingApplication = await prisma.application.findUnique({
      where: {
        reverseDomain: createApplicationDto.reverseDomain
      }
    })

    if (existingApplication) {
      throw new ConflictException("Application already exists")
    }

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
