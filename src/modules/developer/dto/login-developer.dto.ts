import { IsEmail, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class LoginDeveloperDto {
  @IsEmail()
  @ApiProperty({
    description: "Email of the developer",
    example: "furkanbaytekin@gmail.com"
  })
  email: string

  @IsString()
  @ApiProperty({
    description: "Passphrase of the developer",
    example: "aR€4lLy$₺r0nGP4s$PHr4$€"
  })
  passphrase: string
}
