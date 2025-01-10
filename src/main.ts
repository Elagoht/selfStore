import { NestFactory } from "@nestjs/core"
import { SwaggerModule } from "@nestjs/swagger"
import document from "./docs/swagger"
import { ErrorInterceptor } from "./flow/interceptors/error.interceptor"
import { PrismaInterceptor } from "./flow/interceptors/prisma.interceptor"
import { TranslatorInterceptor } from "./flow/interceptors/translator.interceptor"
import validationPipe from "./flow/pipes/validation.pipe"
import { AppModule } from "./resources/modules/app.module"
import Environment from "./utilities/Environment"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.getHttpAdapter().getInstance().disable("x-powered-by")

  app.useGlobalPipes(validationPipe)

  app.useGlobalInterceptors(
    new TranslatorInterceptor(),
    new ErrorInterceptor(),
    new PrismaInterceptor()
  )

  SwaggerModule.setup("swagger", app, document(app))

  Environment.check()
  await app.listen(Environment.PORT)
}

bootstrap()
