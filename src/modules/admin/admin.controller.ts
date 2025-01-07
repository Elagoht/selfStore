import { Body, Controller, Get, Param, Patch } from "@nestjs/common"
import { ApiResponse } from "@nestjs/swagger"
import { PublishStatus } from "@prisma/client"
import { AdminService } from "./admin.service"
import { StatusApplicationDto } from "./dto/status-application.dto"
import { StatusDeveloperDto } from "./dto/status-developer.dto"

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Patch("applications/:applicationId/status")
  changeApplicationPublishStatus(
    @Param("applicationId") applicationId: string,
    @Body() body: StatusApplicationDto
  ) {
    return this.adminService.changeApplicationPublishStatus(
      applicationId,
      body.publishStatus.toUpperCase() as PublishStatus
    )
  }

  @Patch("developers/:developerId/approve")
  @ApiResponse({
    status: 200,
    description: "Developer approved successfully",
    type: StatusDeveloperDto
  })
  approveDeveloper(@Param("developerId") developerId: string) {
    return this.adminService.approveDeveloper(developerId)
  }

  @Patch("developers/:developerId/reject")
  @ApiResponse({
    status: 200,
    description: "Developer rejected successfully",
    type: StatusDeveloperDto
  })
  rejectDeveloper(@Param("developerId") developerId: string) {
    return this.adminService.rejectDeveloper(developerId)
  }

  @Get("admin/applications")
  getAllApplications() {
    return this.adminService.getAllApplications()
  }
}
