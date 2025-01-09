import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { jwtConfig } from "../../config/auth.config"
import { JwtStrategy } from "../../guards/jwt.strategy"
import { DeveloperController } from "./developer.controller"
import { DeveloperService } from "./developer.service"

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn }
    })
  ],
  controllers: [DeveloperController],
  providers: [DeveloperService, JwtStrategy]
})
export class DeveloperModule {}
