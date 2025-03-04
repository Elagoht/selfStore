import { Injectable } from "@nestjs/common"
import {
  PrismaClient,
  PublishStatus,
  UpdateRequestStatus
} from "@prisma/client"
import { ForbiddenException, NotFoundException } from "src/utilities/Exceptions"
import Paginator from "src/utilities/Paginator"
import Printer from "src/utilities/Printer"
import Transform from "src/utilities/Transform"
import { CreateApplicationRequest } from "../dtos/requests/create-application.request"
import { UpdateApplicationRequest } from "../dtos/requests/update-application.request"
import { UpdateCreateRequest } from "../dtos/requests/update-creat-request.request"
import { DeveloperService } from "./developer.service"

const prisma = new PrismaClient()

@Injectable()
export class ApplicationsService {
  public async createCreateRequest(
    createApplicationDto: CreateApplicationRequest,
    developerId: string
  ) {
    const approvedUser = await DeveloperService.isApproved(developerId)

    if (!approvedUser)
      throw new ForbiddenException("applications.createRequest.forbidden")

    return await prisma.application.create({
      data: {
        ...createApplicationDto,
        publishStatus: PublishStatus.REQUESTED,
        developerId: developerId
      }
    })
  }

  public async findAll(page: number, take: number) {
    return await prisma.application.findMany({
      where: {
        deletedAt: null,
        publishStatus: PublishStatus.PUBLISHED
      },
      ...new Paginator(page, take).paginate(),
      select: Transform.toApplicationCardResponse
    })
  }

  public async findByReverseDomain(reverseDomain: string) {
    Printer.debug(reverseDomain)
    const application = await prisma.application.findUnique({
      where: {
        reverseDomain,
        deletedAt: null,
        publishStatus: PublishStatus.PUBLISHED
      }
    })

    if (!application) throw new NotFoundException("applications.list.notFound")

    return application
  }

  public async deleteCreateRequest(developerId: string, reverseDomain: string) {
    const owner = await this.getOwner(reverseDomain)

    if (owner !== developerId)
      throw new ForbiddenException("applications.updateRequest.forbidden")

    return await prisma.application
      .delete({
        where: { reverseDomain }
      })
      .then((deleted) => {
        return { id: deleted.id }
      })
  }

  public async createUpdateRequest(
    reverseDomain: string,
    updateApplicationDto: UpdateApplicationRequest
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

  public async findUpdateRequestsOfDeveloper(
    developerId: string,
    page: number,
    take: number
  ) {
    return await prisma.applicationUpdateRequest.findMany({
      where: { application: { developerId } },
      orderBy: { createdAt: "desc" },
      ...new Paginator(page, take).paginate(),
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

  public async updateCreateRequest(
    developerId: string,
    reverseDomain: string,
    updateCreateRequestDto: UpdateCreateRequest
  ) {
    const owner = await this.getOwner(reverseDomain)

    if (owner !== developerId)
      throw new ForbiddenException("applications.updateRequest.forbidden")

    return await prisma.application.update({
      where: { reverseDomain },
      data: updateCreateRequestDto
    })
  }

  public async findByDeveloperUsername(
    developerUsername: string,
    page: number,
    take: number
  ) {
    return await prisma.application.findMany({
      where: {
        Developer: {
          username: developerUsername
        },
        deletedAt: null,
        publishStatus: PublishStatus.PUBLISHED
      },
      ...new Paginator(page, take).paginate(),
      select: Transform.toApplicationCardResponse
    })
  }

  public async getAllApprovedDevelopers(page: number, take: number) {
    return await prisma.developer.findMany({
      where: { approved: true },
      ...new Paginator(page, take).paginate()
    })
  }

  public async getAllDevelopers(page: number, take: number) {
    return await prisma.developer.findMany({
      ...new Paginator(page, take).paginate()
    })
  }
}
