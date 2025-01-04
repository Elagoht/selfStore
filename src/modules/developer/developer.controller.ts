import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards
} from "@nestjs/common"
import { DeveloperService } from "./developer.service"
import { RegisterDeveloperDto } from "./dto/register-developer.dto"
import { LoginDeveloperDto } from "./dto/login-developer.dto"
import { JwtAuthGuard } from "../../auth/jwt.guard"
import { ProfileDeveloperDto } from "./dto/profile-developrt.dto"
import { ApiOperation, ApiResponse } from "@nestjs/swagger"
import { LoginResponseDto } from "./dto/login-response.dto"

@Controller("auth")
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}

  @Post("register")
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
  @ApiOperation({
    summary: "Get developer profile",
    description:
      "Retrieves the profile information for the authenticated developer",
    security: [{ bearer: [] }]
  })
  @ApiResponse({
    status: 200,
    description: "Profile retrieved successfully",
    type: ProfileDeveloperDto
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized"
  })
  profile(@Request() request: AuthRequest) {
    return this.developerService.getProfile(request.user.username)
  }
}
