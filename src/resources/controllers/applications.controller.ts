import { Controller, Get, Param, Query } from "@nestjs/common"
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger"
import { Application } from "src/resources/models/application.model"
import { ApplicationsService } from "src/resources/services/applications.service"

@ApiTags("Store")
@Controller("store")
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get()
  @ApiOperation({ summary: "Get all published applications" })
  @ApiResponse({
    status: 200,
    description: "Return all published applications.",
    type: [Application]
  })
  @ApiQuery({ name: "page", type: Number, required: false, default: 1 })
  @ApiQuery({ name: "take", type: Number, required: false, default: 12 })
  findAll(@Query("page") page: number, @Query("take") take: number) {
    return this.applicationsService.findAll(page, take)
  }

  @Get(":reverseDomain")
  @ApiOperation({ summary: "Get an application by its reverse domain" })
  @ApiResponse({
    status: 200,
    description: "Return the application.",
    type: Application
  })
  @ApiResponse({ status: 404, description: "Application not found." })
  findByReverseDomain(@Param("reverseDomain") reverseDomain: string) {
    return this.applicationsService.findByReverseDomain(reverseDomain)
  }

  @Get("developer/:username")
  @ApiOperation({ summary: "Get an application by its developer username" })
  @ApiResponse({
    status: 200,
    description: "Return the application array of the developer",
    type: [Application]
  })
  findByDeveloperUsername(@Param("username") username: string) {
    return this.applicationsService.findByDeveloperUsername(username)
  }
}
