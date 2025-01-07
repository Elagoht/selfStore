import { ForbiddenException, Injectable } from "@nestjs/common"
import { PrismaClient, PublishStatus } from "@prisma/client"
import type Translator from "src/utils/Translator"
import { DeveloperService } from "../developer/developer.service"
import { CreateApplicationDto } from "./dto/create-application.dto"

const prisma = new PrismaClient()

@Injectable()
export class ApplicationsService {
  request(
    createApplicationDto: CreateApplicationDto,
    developerId: string,
    translator: Translator
  ) {
    if (!DeveloperService.isApproved(developerId)) {
      throw new ForbiddenException(
        translator.translate("modules.applications.errors.forbidden")
      )
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
