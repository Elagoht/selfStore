import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import Translator from "src/utilities/Translator"

@Injectable()
export class AdminJwtAuthGuard extends AuthGuard("jwt") {
  canActivate(context: ExecutionContext): Promise<boolean> {
    return super.canActivate(context) as Promise<boolean>
  }

  handleRequest(
    error: Error,
    user: any,
    _info: any,
    context: ExecutionContext
  ) {
    const { "accept-language": acceptLanguage } = context
      .switchToHttp()
      .getRequest().headers

    const translator = new Translator(acceptLanguage)

    if (error || !user) {
      throw new UnauthorizedException({
        messages: [translator.translate("errors.unauthorized")],
        status: HttpStatus.UNAUTHORIZED
      })
    }
    return user
  }
}
