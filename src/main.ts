import { NestFactory } from "@nestjs/core"
import { AppModule } from "./modules/app/app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle("SelfStore API")
    .setDescription("Your own store for your own clients and selfOwn")
    .setVersion("0.0.1")
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT ?? 30000)
}

bootstrap()
