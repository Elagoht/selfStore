import { Body, Controller, Get, Param, Patch } from "@nestjs/common"
import { ApiResponse } from "@nestjs/swagger"
import { PublishStatus } from "@prisma/client"
import { StatusApplicationDto } from "src/resources/dtos/requests/status-application.dto"
import { StatusDeveloperDto } from "src/resources/dtos/requests/status-developer.dto"
import { AdminService } from "src/resources/services/admin.service"
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
