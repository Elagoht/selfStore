import { Body, Controller, Get, Param, Patch, Query } from "@nestjs/common"
import { ApiQuery, ApiResponse } from "@nestjs/swagger"
import { PublishStatus } from "@prisma/client"
import { StatusApplicationDto } from "src/resources/dtos/requests/status-application.dto"
import { StatusDeveloperDto } from "src/resources/dtos/requests/status-developer.dto"
import { AdminService } from "src/resources/services/admin.service"

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Patch("store/:reverseDomain/status")
  changeApplicationPublishStatus(
    @Param("reverseDomain") reverseDomain: string,
    @Body() body: StatusApplicationDto
  ) {
    return this.adminService.changeApplicationPublishStatus(
      reverseDomain,
      body.publishStatus.toUpperCase() as PublishStatus
    )
  }

  @Patch("developers/:username/approve")
  @ApiResponse({
    status: 200,
    description: "Developer approved successfully",
    type: StatusDeveloperDto
  })
  approveDeveloper(@Param("username") username: string) {
    return this.adminService.approveDeveloper(username)
  }

  @Patch("developers/:username/reject")
  @ApiResponse({
    status: 200,
    description: "Developer rejected successfully",
    type: StatusDeveloperDto
  })
  rejectDeveloper(@Param("username") username: string) {
    return this.adminService.rejectDeveloper(username)
  }

  @Get("store")
  @ApiQuery({ name: "page", type: Number, required: false, default: 1 })
  @ApiQuery({ name: "take", type: Number, required: false, default: 12 })
  getAllApplications(@Query("page") page: number, @Query("take") take: number) {
    return this.adminService.getAllApplications(page, take)
  }
}
