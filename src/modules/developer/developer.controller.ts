import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards
} from "@nestjs/common"
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { JwtAuthGuard } from "../../guards/jwt.guard"
import { DeveloperService } from "./developer.service"
import { LoginDeveloperDto } from "./dto/login-developer.dto"
import { LoginResponseDto } from "./dto/login-response.dto"
import { ProfileDeveloperDto } from "./dto/profile-developer.dto"
import { RegisterDeveloperDto } from "./dto/register-developer.dto"

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
    type: RegisterDeveloperDto
  })
  register(@Body() createDeveloperDto: RegisterDeveloperDto) {
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
    type: LoginResponseDto
  })
  @HttpCode(200)
  login(@Body() loginDeveloperDto: LoginDeveloperDto) {
    return this.developerService.login(loginDeveloperDto)
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Get developer profile",
    description:
      "Retrieves the profile information for the authenticated developer"
  })
  @ApiResponse({
    status: 200,
    description: "Profile retrieved successfully",
    type: ProfileDeveloperDto
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  profile(@Req() request: AuthRequest) {
    return this.developerService.getProfile(request.user.sub)
  }
}
