import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards
} from "@nestjs/common"
import { ApiBearerAuth, ApiQuery, ApiResponse } from "@nestjs/swagger"
import { PublishStatus } from "@prisma/client"
import { AdminJwtAuthGuard } from "src/flow/guards/admin-jwt.guard"
import { StatusApplicationRequest } from "src/resources/dtos/requests/status-application.request"
import { StatusDeveloperRequest } from "src/resources/dtos/requests/status-developer.request"
import { AdminService } from "src/resources/services/admin.service"
import { ApplicationCardResponse } from "../dtos/responses/application-card.response"

@Controller("admin")
@ApiBearerAuth()
@UseGuards(AdminJwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Patch("store/:reverseDomain/status")
  changeApplicationPublishStatus(
    @Param("reverseDomain") reverseDomain: string,
    @Body() body: StatusApplicationRequest
  ) {
    return this.adminService.changeApplicationPublishStatus(
      reverseDomain,
      body.publishStatus.toUpperCase() as PublishStatus
    )
  }

  @Patch("developers/status/:username")
  @ApiResponse({
    status: 200,
    description: "Developer status changed successfully",
    type: StatusDeveloperRequest
  })
  changeDeveloperStatus(
    @Param("username") username: string,
    @Body() body: StatusDeveloperRequest
  ) {
    return this.adminService.changeDeveloperStatus(username, body.approved)
  }

  @Get("store")
  @ApiQuery({ name: "page", type: Number, required: false, default: 1 })
  @ApiQuery({ name: "take", type: Number, required: false, default: 12 })
  @ApiResponse({
    status: 200,
    description: "Return all applications regardless of its status",
    type: [ApplicationCardResponse]
  })
  getAllApplications(@Query("page") page: number, @Query("take") take: number) {
    return this.adminService.getAllApplications(page, take)
  }
}
