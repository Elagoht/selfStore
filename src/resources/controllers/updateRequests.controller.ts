import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger"

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards
} from "@nestjs/common"
import { ApiOperation, ApiResponse } from "@nestjs/swagger"
import { JwtAuthGuard } from "src/flow/guards/jwt.guard"
import { UpdateApplicationDto } from "../dtos/requests/update-application.dto"
import { UpdateApplicationResponse } from "../dtos/responses/update-application"
import { ApplicationsService } from "../services/applications.service"

@ApiTags("Update Requests")
@Controller("update")
class UpdateRequestsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Patch(":reverseDomain")
  @ApiOperation({ summary: "Update an application you own" })
  @ApiResponse({
    status: 200,
    description: "Return the application update request."
  })
  @ApiResponse({
    status: 403,
    description: "You are not the owner of this application."
  })
  @ApiResponse({ status: 404, description: "Application not found." })
  @ApiBody({ type: UpdateApplicationDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  createUpdateRequest(
    @Param("reverseDomain") reverseDomain: string,
    @Body() updateApplicationDto: UpdateApplicationDto
  ) {
    return this.applicationsService.createUpdateRequest(
      reverseDomain,
      updateApplicationDto
    )
  }

  @Get()
  @ApiOperation({ summary: "List of your update requests" })
  @ApiResponse({
    status: 200,
    description: "Return the application update requests list.",
    type: [UpdateApplicationResponse]
  })
  @ApiQuery({ name: "page", type: Number, required: false, default: 1 })
  @ApiQuery({ name: "take", type: Number, required: false, default: 12 })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findUpdateRequestsOfDeveloper(
    @Req() request: AuthRequest,
    @Query("page") page: number,
    @Query("take") take: number
  ) {
    return this.applicationsService.findUpdateRequestsOfDeveloper(
      request.user.sub,
      page,
      take
    )
  }

  @Get(":reverseDomain")
  @ApiOperation({ summary: "Get an update request" })
  @ApiResponse({
    status: 200,
    description: "Return the application update request."
  })
  @ApiResponse({ status: 404, description: "Application not found." })
  @ApiResponse({
    status: 403,
    description: "You are not the owner of this application."
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findUpdateRequestOfDeveloper(
    @Req() request: AuthRequest,
    @Param("reverseDomain") reverseDomain: string
  ) {
    return this.applicationsService.findUpdateRequestOfDeveloper(
      request.user.sub,
      reverseDomain
    )
  }

  @Delete(":reverseDomain")
  @ApiOperation({ summary: "Delete an update request" })
  @ApiResponse({
    status: 200,
    description: "Return the application update request."
  })
  @ApiResponse({
    status: 403,
    description: "You are not the owner of this application."
  })
  @ApiResponse({ status: 404, description: "Application not found." })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  deleteUpdateRequest(
    @Req() request: AuthRequest,
    @Param("reverseDomain") reverseDomain: string
  ) {
    return this.applicationsService.deleteUpdateRequest(
      request.user.sub,
      reverseDomain
    )
  }
}

export default UpdateRequestsController
