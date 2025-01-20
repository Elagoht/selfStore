import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { jwtConfig } from "../../config/auth.config"

@Injectable()
export class DeveloperJwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret
    })
  }

  validate(payload: AuthRequest["user"]) {
    return {
      sub: payload.sub,
      username: payload.username,
      isAdmin: payload.isAdmin
    }
  }
}
