import { ApiProperty } from "@nestjs/swagger"
import { PublishStatus } from "@prisma/client"
import { IsEnum } from "class-validator"

export class StatusApplicationDto {
  @IsEnum(PublishStatus)
  @ApiProperty({
    description: "The status of the application",
    enum: PublishStatus,
    example: PublishStatus.PUBLISHED
  })
  publishStatus: PublishStatus
}
