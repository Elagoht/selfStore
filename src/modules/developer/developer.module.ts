import { Module } from "@nestjs/common"
import { DeveloperService } from "./developer.service"
import { DeveloperController } from "./developer.controller"
import { JwtModule } from "@nestjs/jwt"
import { jwtConfig } from "../../config/auth.config"
import { JwtStrategy } from "../../auth/jwt.strategy"

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn }
    })
  ],
  controllers: [DeveloperController],
  providers: [DeveloperService, JwtStrategy],
  exports: [DeveloperService]
})
export class DeveloperModule {}
