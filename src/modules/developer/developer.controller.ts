import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards
} from "@nestjs/common"
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { AcceptLanguage } from "src/decorators/accept-language.decorator"
import Translator from "src/utils/Translator"
import { JwtAuthGuard } from "../../auth/jwt.guard"
import { DeveloperService } from "./developer.service"
import { LoginDeveloperDto } from "./dto/login-developer.dto"
import { LoginResponseDto } from "./dto/login-response.dto"
import { ProfileDeveloperDto } from "./dto/profile-developer.dto"
import { RegisterDeveloperDto } from "./dto/register-developer.dto"

@Controller("auth")
export class DeveloperController {
  constructor(private readonly developerService: DeveloperService) {}

  @Post("register")
  register(
    @Body() createDeveloperDto: RegisterDeveloperDto,
    @AcceptLanguage() acceptLanguage: string
  ) {
    const translator = new Translator(acceptLanguage)

    return this.developerService.register(createDeveloperDto, translator)
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
  login(
    @Body() loginDeveloperDto: LoginDeveloperDto,
    @AcceptLanguage() acceptLanguage: string
  ) {
    const translator = new Translator(acceptLanguage)

    return this.developerService.login(loginDeveloperDto, translator)
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: "Get developer profile",
    description:
      "Retrieves the profile information for the authenticated developer"
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: "Profile retrieved successfully",
    type: ProfileDeveloperDto
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized"
  })
  profile(
    @Request() request: AuthRequest,
    @AcceptLanguage() acceptLanguage: string
  ) {
    const translator = new Translator(acceptLanguage)

    return this.developerService.getProfile(request.user.username, translator)
  }
}
