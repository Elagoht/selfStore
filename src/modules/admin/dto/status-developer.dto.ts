import { ApiProperty } from "@nestjs/swagger"
import { Developer } from "@prisma/client"
import { IsBoolean } from "class-validator"

export class StatusDeveloperDto {
  @IsBoolean()
  @ApiProperty({
    description: "The status of the developer",
    example: true
  })
  approved: Developer["approved"]
}
