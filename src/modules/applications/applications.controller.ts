import {
  Body,
  Controller,
  Get,
  Param,
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
import { JwtAuthGuard } from "src/auth/jwt.guard"
import { ApplicationsService } from "./applications.service"
import { CreateApplicationDto } from "./dto/create-application.dto"
import { Application } from "./entities/application.entity"

@ApiTags("Store")
@Controller("store")
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post("request")
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

  @Get("applications")
  @ApiOperation({ summary: "Get all applications" })
  @ApiResponse({
    status: 200,
    description: "Return all applications.",
    type: [Application]
  })
  findAll() {
    return this.applicationsService.findAll()
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
}
