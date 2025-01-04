import { IsBoolean, IsEmail, IsUrl } from "class-validator"

import { IsOptional, IsString, MaxLength, MinLength } from "class-validator"

import { ApiProperty } from "@nestjs/swagger"

export class ProfileDeveloperDto {
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
  realName: string

  @IsEmail()
  @ApiProperty({
    description: "Email address of the developer",
    example: "furkanbaytekin@gmail.com"
  })
  email: string

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
  websiteUrl: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Bio of the developer",
    example: "Hello, I'm Furkan. I'm the creator of this platform.",
    nullable: true
  })
  bio: string

  @IsBoolean()
  @ApiProperty({
    description: "Can the developer create applications",
    example: true
  })
  approved: boolean
}
