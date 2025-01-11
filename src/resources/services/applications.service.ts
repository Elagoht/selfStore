import { Injectable } from "@nestjs/common"
import {
  PrismaClient,
  PublishStatus,
  UpdateRequestStatus
} from "@prisma/client"
import { ForbiddenException, NotFoundException } from "src/utilities/Exceptions"
import Printer from "src/utilities/Printer"
import { CreateApplicationDto } from "../dtos/requests/create-application.dto"
import { UpdateApplicationDto } from "../dtos/requests/update-application.dto"
import { DeveloperService } from "./developer.service"

const prisma = new PrismaClient()

@Injectable()
export class ApplicationsService {
  public async request(
    createApplicationDto: CreateApplicationDto,
    developerId: string
  ) {
    const approvedUser = await DeveloperService.isApproved(developerId)

    Printer.info(approvedUser)

    if (!approvedUser)
      throw new ForbiddenException("applications.createRequest.forbidden")

    return prisma.application.create({
      data: {
        ...createApplicationDto,
        publishStatus: PublishStatus.REQUESTED,
        developerId: developerId
      }
    })
  }

  public async findAll() {
    return await prisma.application.findMany({
      where: {
        deletedAt: null,
        publishStatus: PublishStatus.PUBLISHED
      }
    })
  }

  public async findByReverseDomain(reverseDomain: string) {
    return await prisma.application.findUnique({
      where: { reverseDomain }
    })
  }

  public async createUpdateRequest(
    reverseDomain: string,
    updateApplicationDto: UpdateApplicationDto
  ) {
    const owner = await this.getOwner(reverseDomain)

    if (!owner)
      throw new ForbiddenException("applications.updateRequest.forbidden")

    return await prisma.applicationUpdateRequest.create({
      data: {
        ...updateApplicationDto,
        status: UpdateRequestStatus.PENDING,
        application: {
          connect: { reverseDomain }
        }
      }
    })
  }

  public async findUpdateRequestsOfDeveloper(developerId: string) {
    return await prisma.applicationUpdateRequest.findMany({
      where: { application: { developerId } },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        application: {
          select: {
            logo: true,
            reverseDomain: true,
            spot: true
          }
        }
      }
    })
  }

  public async findUpdateRequestOfDeveloper(
    developerId: string,
    reverseDomain: string
  ) {
    const updateRequest = await prisma.applicationUpdateRequest.findUnique({
      where: { reverseDomain },
      select: {
        id: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        application: {
          select: {
            reverseDomain: true,
            logo: true,
            spot: true,
            developerId: true
          }
        }
      }
    })

    if (!updateRequest)
      throw new NotFoundException("applications.updateRequest.notFound")

    if (updateRequest.application.developerId !== developerId)
      throw new ForbiddenException("applications.updateRequest.forbidden")

    return updateRequest
  }

  public async deleteUpdateRequest(developerId: string, reverseDomain: string) {
    const updateRequest = await prisma.applicationUpdateRequest.findUnique({
      where: { reverseDomain },
      include: { application: { select: { developerId: true } } }
    })

    if (!updateRequest)
      throw new NotFoundException("applications.updateRequest.notFound")

    if (updateRequest.application.developerId !== developerId)
      throw new ForbiddenException("applications.updateRequest.forbidden")

    await prisma.applicationUpdateRequest.delete({
      where: { reverseDomain }
    })
  }

  private async getOwner(reverseDomain: string): Promise<string> {
    const application = await prisma.application.findUnique({
      where: { reverseDomain }
    })

    if (!application) throw new NotFoundException("applications.list.notFound")

    return application.developerId
  }
}
