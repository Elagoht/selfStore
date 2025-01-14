import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class RegisterAdminRequest {
  @IsString({ message: "validations.common|field=token" })
  @ApiProperty({
    description: "The referral token given by an authorized admin"
  })
  token: string

  @IsEmail({}, { message: "validations.email|field=email" })
  @ApiProperty({ description: "The email of the admin" })
  email: string

  @IsString({ message: "validations.common|field=passphrase" })
  @MinLength(24, { message: "validations.generic.min|min=24,field=passphrase" })
  @MaxLength(100, {
    message: "validations.generic.max|max=100,field=passphrase"
  })
  @ApiProperty({ description: "The passphrase of the admin" })
  passphrase: string
}
