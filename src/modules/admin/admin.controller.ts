import { Body, Controller, Get, Param, Patch } from "@nestjs/common"
import { PublishStatus } from "@prisma/client"
import { AdminService } from "./admin.service"

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Patch("publish-status/:applicationId")
  changeApplicationPublishStatus(
    @Param("applicationId") applicationId: string,
    @Body() body: { publishStatus: PublishStatus }
  ) {
    return this.adminService.changeApplicationPublishStatus(
      applicationId,
      body.publishStatus
    )
  }

  @Get("admin/applications")
  getAllApplications() {
    return this.adminService.getAllApplications()
  }
}
