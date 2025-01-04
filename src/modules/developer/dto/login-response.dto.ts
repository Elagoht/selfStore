import { IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class LoginResponseDto {
  @IsString()
  @ApiProperty({
    description: "JWT token for authentication",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  })
  token: string
}
