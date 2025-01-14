import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class LoginAdminRequest {
  @IsEmail({}, { message: "validations.email|field=email" })
  @ApiProperty({
    description: "Email of the developer",
    example: "furkanbaytekin@gmail.com"
  })
  email: string

  @IsString({ message: "validations.common|field=passphrase" })
  @ApiProperty({
    description: "Passphrase of the developer",
    example: "aR€4lLy$₺r0nGP4s$PHr4$€"
  })
  passphrase: string
}
