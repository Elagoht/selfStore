import { Controller, Get, Param, Query } from "@nestjs/common"
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger"
import { Application } from "src/resources/models/application.model"
import { ApplicationsService } from "src/resources/services/applications.service"
import { ApplicationCardResponse } from "../dtos/responses/application-card.response"

@ApiTags("Store")
@Controller("store")
export class StoreController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get("applications")
  @ApiOperation({ summary: "Get paginated published application cards" })
  @ApiResponse({
    status: 200,
    description: "Return paginated published application cards.",
    type: [ApplicationCardResponse]
  })
  @ApiQuery({ name: "page", type: Number, required: false, default: 1 })
  @ApiQuery({ name: "take", type: Number, required: false, default: 12 })
  findAll(@Query("page") page: number, @Query("take") take: number) {
    return this.applicationsService.findAll(page, take)
  }

  @Get("applications/:reverseDomain")
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

  @Get("developers")
  @ApiQuery({ name: "page", type: Number, required: false, default: 1 })
  @ApiQuery({ name: "take", type: Number, required: false, default: 12 })
  findAllDevelopers(@Query("page") page: number, @Query("take") take: number) {
    return this.applicationsService.getAllApprovedDevelopers(page, take)
  }

  @Get("developers/:username")
  @ApiOperation({ summary: "Get applications by its developer username" })
  @ApiResponse({
    status: 200,
    description: "Return the application array of the developer",
    type: [ApplicationCardResponse]
  })
  @ApiQuery({ name: "page", type: Number, required: false, default: 1 })
  @ApiQuery({ name: "take", type: Number, required: false, default: 12 })
  findByDeveloperUsername(
    @Param("username") username: string,
    @Query("page") page: number,
    @Query("take") take: number
  ) {
    return this.applicationsService.findByDeveloperUsername(
      username,
      page,
      take
    )
  }
}
