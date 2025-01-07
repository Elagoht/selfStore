import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { LanguageInterceptor } from "./interceptors/language.interceptor"
import { AppModule } from "./modules/app/app.module"
import { GoalKeeperPipe } from "./pipes/goalkeeper.pipe"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.getHttpAdapter().getInstance().disable("x-powered-by")

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      validateCustomDecorators: true
    }),
    new GoalKeeperPipe()
  )

  const config = new DocumentBuilder()
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

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("swagger", app, document)

  app.useGlobalInterceptors(new LanguageInterceptor())

  await app.listen(process.env.PORT ?? 30000)
}

bootstrap()
