import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards
} from "@nestjs/common"
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger"
import { DeveloperJwtAuthGuard } from "src/flow/guards/developer-jwt.guard"
import { LoginDeveloperRequest } from "src/resources/dtos/requests/login-developer.request"
import { RegisterDeveloperRequest } from "src/resources/dtos/requests/register-developer.request"
import { LoginResponse } from "src/resources/dtos/responses/login-developer.response"
import { ProfileDeveloperResponse } from "src/resources/dtos/responses/profile-developer.response"
import { DeveloperService } from "../services/developer.service"

@ApiTags("Developer Auth")
@Controller("auth")
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}

  @Post("register")
  @ApiOperation({
    summary: "Register a new developer",
    description: "Registers a new developer account"
  })
  @ApiResponse({
    status: 201,
    description: "Developer registered successfully",
    type: RegisterDeveloperRequest
  })
  register(@Body() createDeveloperDto: RegisterDeveloperRequest) {
    return this.developerService.register(createDeveloperDto)
  }

  @Post("login")
  @ApiOperation({
    summary: "Login as a developer",
    description: "Logs in a developer and returns a JWT token"
  })
  @ApiResponse({
    status: 200,
    description: "Login successful",
    type: LoginResponse
  })
  @HttpCode(200)
  login(@Body() loginDeveloperDto: LoginDeveloperRequest) {
    return this.developerService.login(loginDeveloperDto)
  }

  @Get("profile")
  @UseGuards(DeveloperJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get developer profile",
    description:
      "Retrieves the profile information for the authenticated developer"
  })
  @ApiResponse({
    status: 200,
    description: "Profile retrieved successfully",
    type: ProfileDeveloperResponse
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  profile(@Req() request: AuthRequest) {
    return this.developerService.getProfile(request.user.sub)
  }
}
