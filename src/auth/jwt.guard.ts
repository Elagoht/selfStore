import {
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import Translator from "../utils/Translator"

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  private translator: Translator

  canActivate(context: ExecutionContext): Promise<boolean> {
    // Get the request object
    const request = context.switchToHttp().getRequest()

    // Create new translator instance with accept-language header
    const acceptLanguage = request.headers["accept-language"] || "en"
    this.translator = new Translator(acceptLanguage)

    // Execute the regular JWT authentication
    return super.canActivate(context) as Promise<boolean>
  }

  handleRequest(error: Error, user: any) {
    if (error || !user) {
      throw (
        error ||
        new UnauthorizedException(
          this.translator.translate("common.errors.unauthorized")
        )
      )
    }
    return user
  }
}
