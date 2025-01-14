import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { jwtConfig } from "src/config/auth.config"
import { AdminJwtStrategy } from "src/flow/guards/admin-jwt.strategy"
import { AdminAuthController } from "../controllers/adminAuth.controller"
import { AdminAuthService } from "../services/adminAuth.service"

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn }
    })
  ],
  controllers: [AdminAuthController],
  providers: [AdminAuthService, AdminJwtStrategy]
})
export class AdminAuthModule {}
