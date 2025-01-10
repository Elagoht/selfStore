import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { DeveloperController } from "src/resources/controllers/developer.controller"
import { jwtConfig } from "../../config/auth.config"
import { JwtStrategy } from "../../flow/guards/jwt.strategy"
import { DeveloperService } from "../services/developer.service"

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
