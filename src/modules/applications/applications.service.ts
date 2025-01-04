import { Injectable } from "@nestjs/common"
import { PrismaClient, PublishStatus } from "@prisma/client"
import GoalKeeper from "src/utils/GoalKeeper"
import { CreateApplicationDto } from "./dto/create-application.dto"

const prisma = new PrismaClient()

@Injectable()
export class ApplicationsService {
  async create(
    createApplicationDto: CreateApplicationDto,
    developerId: string
  ) {
    return await GoalKeeper.startShift(() => {
      return prisma.application.create({
        data: {
          ...createApplicationDto,
          publishStatus: PublishStatus.REQUESTED,
          permissions: [],
          developerId: developerId
        }
      })
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
