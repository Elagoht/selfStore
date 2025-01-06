import { Body, Controller, Get, Param, Patch, Req } from "@nestjs/common"
import { PublishStatus } from "@prisma/client"
import Translator from "src/utils/Translator"
import { AdminService } from "./admin.service"

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Patch("publish-status/:applicationId")
  changeApplicationPublishStatus(
    @Param("applicationId") applicationId: string,
    @Body() body: { publishStatus: PublishStatus },
    @Req() request: NestRequest
  ) {
    const translator = new Translator(request.acceptLanguage)
    return this.adminService.changeApplicationPublishStatus(
      applicationId,
      body.publishStatus,
      translator
    )
  }

  @Get("admin/applications")
  getAllApplications(@Req() request: NestRequest) {
    const translator = new Translator(request.acceptLanguage)
    return this.adminService.getAllApplications(translator)
  }
}
