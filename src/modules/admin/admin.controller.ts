import { Body, Controller, Get, Headers, Param, Patch } from "@nestjs/common"
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
    @Headers("accept-language") acceptLanguage: string
  ) {
    const translator = new Translator(acceptLanguage)
    return this.adminService.changeApplicationPublishStatus(
      applicationId,
      body.publishStatus,
      translator
    )
  }

  @Get("admin/applications")
  getAllApplications(@Headers("accept-language") acceptLanguage: string) {
    const translator = new Translator(acceptLanguage)
    return this.adminService.getAllApplications(translator)
  }
}
