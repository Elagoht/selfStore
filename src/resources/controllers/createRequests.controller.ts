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
import { JwtAuthGuard } from "src/flow/guards/jwt.guard"
import { CreateApplicationDto } from "src/resources/dtos/requests/create-application.dto"
import { Application } from "src/resources/models/application.model"
import { ApplicationsService } from "src/resources/services/applications.service"
import { UpdateCreateRequestDto } from "../dtos/requests/update-creat-request.dto"

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
  createCreateRequest(
    @Body() createApplicationDto: CreateApplicationDto,
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @ApiBody({ type: UpdateCreateRequestDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateCreateRequest(
    @Req() request: AuthRequest,
    @Param("reverseDomain") reverseDomain: string,
    @Body() updateCreateRequestDto: UpdateCreateRequestDto
  ) {
    return this.applicationsService.updateCreateRequest(
      request.user.sub,
      reverseDomain,
      updateCreateRequestDto
    )
  }
}
