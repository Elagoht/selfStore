import { ApiProperty } from "@nestjs/swagger"
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength
} from "class-validator"

export class RegisterDeveloperDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @ApiProperty({
    description: "Username of the developer",
    example: "Elagoht"
  })
  username: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Real name of the developer if they want to be displayed",
    example: "Furkan",
    nullable: true
  })
  realName: string | null

  @IsEmail()
  @ApiProperty({
    description: "Email address of the developer",
    example: "furkanbaytekin@gmail.com"
  })
  email: string

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @ApiProperty({
    description: "Passphrase of the developer",
    example: "aR€4lLy$₺r0nGP4s$PHr4$€"
  })
  passphrase: string

  @IsUrl()
  @IsOptional()
  @ApiProperty({
    description: "Git profile URL of the developer to provide confidence",
    example: "https://github.com/Elagoht"
  })
  gitProfileUrl: string

  @IsUrl()
  @IsOptional()
  @ApiProperty({
    description: "Website URL of the developer",
    example: "https://furkanbaytekin.dev",
    nullable: true
  })
  websiteUrl: string | null

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Bio of the developer",
    example: "Hello, I'm Furkan. I'm the creator of this platform.",
    nullable: true
  })
  bio: string | null
}
