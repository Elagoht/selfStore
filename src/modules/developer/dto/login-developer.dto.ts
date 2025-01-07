import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class LoginDeveloperDto {
  @IsEmail()
  @ApiProperty({
    description: "Email of the developer",
    example: "furkanbaytekin@gmail.com"
  })
  email: string

  @IsString()
  @MinLength(12)
  @MaxLength(100)
  @ApiProperty({
    description: "Passphrase of the developer",
    example: "aR€4lLy$₺r0nGP4s$PHr4$€"
  })
  passphrase: string
}
