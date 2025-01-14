import { Body, Controller, Post } from "@nestjs/common"
import { ApiOperation } from "@nestjs/swagger"
import { AdminAuthService } from "../services/adminAuth.service"

@Controller("admin/auth")
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post("generate-token")
  @ApiOperation({
    summary: "1 day token for register an admin",
    description: "Generate a token for an admin to register in one day"
  })
  generateToken() {
    return this.adminAuthService.generateToken()
  }

  @Post("register")
  registerAdmin(@Body() body: RegisterAdminDto) {
    return this.adminAuthService.registerAdmin(
      body.token,
      body.email,
      body.passphrase
    )
  }
}
