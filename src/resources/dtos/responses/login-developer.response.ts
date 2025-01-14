import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class LoginResponse {
  @IsString({ message: "validations.common|field=token" })
  @ApiProperty({
    description: "JWT token for authentication",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  })
  token: string
}
