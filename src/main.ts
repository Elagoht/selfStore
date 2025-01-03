import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle("Applications API")
    .setDescription("The Applications API description")
    .setVersion("1.0")
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT ?? 30000)
}

bootstrap()
