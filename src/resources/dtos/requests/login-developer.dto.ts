import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class LoginDeveloperDto {
  @IsEmail({}, { message: "validations.email|field=email" })
  @ApiProperty({
    description: "Email of the developer",
    example: "furkanbaytekin@gmail.com"
  })
  email: string

  @IsString({ message: "validations.common|field=passphrase" })
  @MinLength(12, { message: "validations.generic.min|min=12,field=passphrase" })
  @MaxLength(100, {
    message: "validations.generic.max|max=100,field=passphrase"
  })
  @ApiProperty({
    description: "Passphrase of the developer",
    example: "aR€4lLy$₺r0nGP4s$PHr4$€"
  })
  passphrase: string
}
