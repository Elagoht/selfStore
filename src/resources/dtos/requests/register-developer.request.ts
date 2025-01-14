import { ApiProperty } from "@nestjs/swagger"
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength
} from "class-validator"

export class RegisterDeveloperRequest {
  @IsString({ message: "validations.common|field=username" })
  @MinLength(3, { message: "validations.generic.min|min=3,field=username" })
  @MaxLength(20, { message: "validations.generic.max|max=20,field=username" })
  @ApiProperty({
    description: "Username of the developer",
    example: "Elagoht"
  })
  username: string

  @IsString({ message: "validations.common|field=realName" })
  @IsOptional()
  @ApiProperty({
    description: "Real name of the developer if they want to be displayed",
    example: "Furkan",
    nullable: true
  })
  realName: string | null

  @IsEmail({}, { message: "validations.email|field=email" })
  @ApiProperty({
    description: "Email address of the developer",
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

  @IsUrl({}, { message: "validations.url|field=gitProfileUrl" })
  @IsOptional()
  @ApiProperty({
    description: "Git profile URL of the developer to provide confidence",
    example: "https://github.com/Elagoht"
  })
  gitProfileUrl: string

  @IsUrl({}, { message: "validations.url|field=websiteUrl" })
  @IsOptional()
  @ApiProperty({
    description: "Website URL of the developer",
    example: "https://furkanbaytekin.dev",
    nullable: true
  })
  websiteUrl: string | null

  @IsString({ message: "validations.common|field=bio" })
  @IsOptional()
  @ApiProperty({
    description: "Bio of the developer",
    example: "Hello, I'm Furkan. I'm the creator of this platform.",
    nullable: true
  })
  bio: string | null
}
