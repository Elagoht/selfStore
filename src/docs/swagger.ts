import { DocumentBuilder } from "@nestjs/swagger"

import { INestApplication } from "@nestjs/common"
import { SwaggerModule } from "@nestjs/swagger"

const document = (app: INestApplication) =>
  SwaggerModule.createDocument(
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

export default document
