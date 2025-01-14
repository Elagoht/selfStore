import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  UseGuards
} from "@nestjs/common"
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger"
import { DeveloperJwtAuthGuard } from "src/flow/guards/developer-jwt.guard"
import { CreateApplicationRequest } from "src/resources/dtos/requests/create-application.request"
import { Application } from "src/resources/models/application.model"
import { ApplicationsService } from "src/resources/services/applications.service"
import { UpdateCreateRequest } from "../dtos/requests/update-creat-request.request"

@ApiTags("Create Requests")
@Controller("create")
@UseGuards(DeveloperJwtAuthGuard)
@ApiBearerAuth()
export class CreateRequestsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new application request",
    description: "Create a new application request"
  })
  @ApiBody({ type: CreateApplicationRequest })
  @ApiResponse({
    status: 201,
    description: "The application request has been received.",
    type: Application
  })
  createCreateRequest(
    @Body() createApplicationDto: CreateApplicationRequest,
    @Req() request: AuthRequest
  ) {
    return this.applicationsService.createCreateRequest(
      createApplicationDto,
      request.user.sub
    )
  }

  @Delete(":reverseDomain")
  @ApiResponse({
    status: 200,
    description: "Returns the application create request."
  })
  @ApiResponse({
    status: 403,
    description: "You are not the owner of this application."
  })
  @ApiResponse({ status: 404, description: "Application not found." })
  @ApiOperation({ summary: "Delete a create request sent by you" })
  deleteCreateRequest(
    @Req() request: AuthRequest,
    @Param("reverseDomain") reverseDomain: string
  ) {
    return this.applicationsService.deleteCreateRequest(
      request.user.sub,
      reverseDomain
    )
  }

  @Patch(":reverseDomain")
  @ApiOperation({
    summary: "Update a create request that not approved yet and sent by you"
  })
  @ApiBody({ type: UpdateCreateRequest })
  updateCreateRequest(
    @Req() request: AuthRequest,
    @Param("reverseDomain") reverseDomain: string,
    @Body() updateCreateRequestDto: UpdateCreateRequest
  ) {
    return this.applicationsService.updateCreateRequest(
      request.user.sub,
      reverseDomain,
      updateCreateRequestDto
    )
  }
}
