import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common"
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger"
import { JwtAuthGuard } from "src/flow/guards/jwt.guard"
import { CreateApplicationDto } from "src/resources/dtos/requests/create-application.dto"
import { Application } from "src/resources/models/application.model"
import { ApplicationsService } from "src/resources/services/applications.service"

@ApiTags("Create Requests")
@Controller("create")
export class CreateRequestsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new application request",
    description: "Create a new application request"
  })
  @ApiBody({ type: CreateApplicationDto })
  @ApiResponse({
    status: 201,
    description: "The application request has been received.",
    type: Application
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  request(
    @Body() createApplicationDto: CreateApplicationDto,
    @Req() request: AuthRequest
  ) {
    return this.applicationsService.request(
      createApplicationDto,
      request.user.sub
    )
  }
}
