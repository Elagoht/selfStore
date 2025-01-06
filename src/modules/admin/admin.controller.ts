import { Body, Controller, Get, Param, Patch, Req } from "@nestjs/common"
import { ApiResponse } from "@nestjs/swagger"
import { PublishStatus } from "@prisma/client"
import Translator from "src/utils/Translator"
import { AdminService } from "./admin.service"
import { StatusApplicationDto } from "./dto/status-application.dto"
import { StatusDeveloperDto } from "./dto/status-developer.dto"

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Patch("applications/:applicationId/status")
  changeApplicationPublishStatus(
    @Param("applicationId") applicationId: string,
    @Body() body: StatusApplicationDto,
    @Req() request: NestRequest
  ) {
    const translator = new Translator(request.acceptLanguage)
    return this.adminService.changeApplicationPublishStatus(
      applicationId,
      body.publishStatus.toUpperCase() as PublishStatus,
      translator
    )
  }

  @Patch("developers/:developerId/approve")
  @ApiResponse({
    status: 200,
    description: "Developer approved successfully",
    type: StatusDeveloperDto
  })
  approveDeveloper(
    @Param("developerId") developerId: string,
    @Req() request: NestRequest
  ) {
    const translator = new Translator(request.acceptLanguage)
    return this.adminService.approveDeveloper(developerId, translator)
  }

  @Patch("developers/:developerId/reject")
  @ApiResponse({
    status: 200,
    description: "Developer rejected successfully",
    type: StatusDeveloperDto
  })
  rejectDeveloper(
    @Param("developerId") developerId: string,
    @Req() request: NestRequest
  ) {
    const translator = new Translator(request.acceptLanguage)
    return this.adminService.rejectDeveloper(developerId, translator)
  }

  @Get("admin/applications")
  getAllApplications(@Req() request: NestRequest) {
    const translator = new Translator(request.acceptLanguage)
    return this.adminService.getAllApplications(translator)
  }
}
