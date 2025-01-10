import { Injectable } from "@nestjs/common"
import { PrismaClient, PublishStatus } from "@prisma/client"
import { ForbiddenException } from "src/utilities/Exceptions"
import Printer from "src/utilities/Printer"
import { CreateApplicationDto } from "../dtos/requests/create-application.dto"
import { DeveloperService } from "./developer.service"

const prisma = new PrismaClient()

@Injectable()
export class ApplicationsService {
  async request(
    createApplicationDto: CreateApplicationDto,
    developerId: string
  ) {
    const approvedUser = await DeveloperService.isApproved(developerId)

    Printer.info(approvedUser)

    if (!approvedUser) throw new ForbiddenException("applications.forbidden")

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
