import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { LanguageInterceptor } from "./interceptors/language.interceptor"
import { AppModule } from "./modules/app/app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  )

  const config = new DocumentBuilder()
    .setTitle("Your API Title")
    .setDescription("Your API Description")
    .setVersion("1.0")
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  )

  app.useGlobalInterceptors(new LanguageInterceptor())

  await app.listen(process.env.PORT ?? 30000)
}

bootstrap()
