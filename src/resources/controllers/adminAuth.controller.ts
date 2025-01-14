import { Body, Controller, Post, UseGuards } from "@nestjs/common"
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger"
import { AdminJwtAuthGuard } from "src/flow/guards/admin-jwt.guard"
import { LoginAdminRequest } from "../dtos/requests/login-admin.request"
import { RegisterAdminRequest } from "../dtos/requests/register-admin.request"
import { AdminTokenResponse } from "../dtos/responses/admin-token.response"
import { AdminAuthService } from "../services/adminAuth.service"

@ApiTags("Admin Auth")
@Controller("admin/auth")
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post("register-token")
  @ApiOperation({
    summary: "1 day token for register an admin",
    description: "Generate a token for an admin to register in one day"
  })
  @ApiBearerAuth()
  @ApiResponse({ type: AdminTokenResponse })
  @UseGuards(AdminJwtAuthGuard)
  registerToken() {
    return this.adminAuthService.registerToken()
  }

  @Post("register")
  @ApiOperation({
    summary: "Register an admin",
    description: "Register an admin with a token"
  })
  registerAdmin(@Body() body: RegisterAdminRequest) {
    return this.adminAuthService.registerAdmin(
      body.token,
      body.email,
      body.passphrase
    )
  }

  @Post("login")
  @ApiOperation({
    summary: "Login an admin",
    description: "Login an admin with email and passphrase"
  })
  loginAdmin(@Body() body: LoginAdminRequest) {
    return this.adminAuthService.loginAdmin(body.email, body.passphrase)
  }
}
