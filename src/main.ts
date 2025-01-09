import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { ErrorInterceptor } from "./interceptors/error.interceptor"
import { PrismaInterceptor } from "./interceptors/prisma.interceptor"
import { TranslatorInterceptor } from "./interceptors/translator.interceptor"
import { AppModule } from "./modules/app/app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.getHttpAdapter().getInstance().disable("x-powered-by")

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      validateCustomDecorators: true
    })
  )

  app.useGlobalInterceptors(
    new TranslatorInterceptor(),
    new ErrorInterceptor(),
    new PrismaInterceptor()
  )

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle("SelfStore API")
      .setDescription("SelfStore API Documentation")
      .setVersion("1.0")
      .addBearerAuth()
      .addGlobalParameters({
        name: "accept-language",
        description: "Language code (e.g., en-US, tr-TR)",
        required: false,
        schema: {
          default: "en-US",
          enum: ["en-US", "tr-TR"],
          type: "string"
        },
        in: "header"
      })
      .build()
  )
  SwaggerModule.setup("swagger", app, document)

  await app.listen(process.env.PORT ?? 30000)
}

bootstrap()
