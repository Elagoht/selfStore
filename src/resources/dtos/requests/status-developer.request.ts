import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean } from "class-validator"
export class StatusDeveloperRequest {
  @ApiProperty({
    description: "The status of the developer",
    example: true
  })
  @IsBoolean()
  approved: boolean
}
