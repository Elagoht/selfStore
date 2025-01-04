import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"
import { jwtConfig } from "../config/auth.config"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret
    })
  }

  validate(payload: AuthRequest["user"]) {
    return {
      username: payload.username,
      email: payload.email,
      id: payload.id
    }
  }
}
