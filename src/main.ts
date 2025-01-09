import { NestFactory } from "@nestjs/core"
import { SwaggerModule } from "@nestjs/swagger"
import document from "./docs/swagger"
import { ErrorInterceptor } from "./interceptors/error.interceptor"
import { PrismaInterceptor } from "./interceptors/prisma.interceptor"
import { TranslatorInterceptor } from "./interceptors/translator.interceptor"
import { AppModule } from "./modules/app/app.module"
import validationPipe from "./pipes/validation.pipe"
import Environment from "./utils/Environment"

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
