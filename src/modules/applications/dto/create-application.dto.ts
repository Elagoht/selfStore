import { ApiProperty } from "@nestjs/swagger"
import { License } from "@prisma/client"
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength
} from "class-validator"

export class CreateApplicationDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @ApiProperty({ description: "Name of the application" })
  name: string

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @Matches(/^[a-z0-9]+\.[a-z0-9]+\.[a-z0-9]+$/)
  @ApiProperty({
    description: "Reverse domain notation identifier (e.g. com.example.app)"
  })
  reverseDomain: string

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @ApiProperty({
    description: "Docker image user part of user/application:tag"
  })
  dockerImageUser: string

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @ApiProperty({
    description: "Docker image name part of user/application:tag"
  })
  dockerImageName: string

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @ApiProperty({ description: "Docker image tag part of user/application:tag" })
  dockerImageTag: string

  @IsUrl()
  @ApiProperty({
    description: "Docker registry URL, defaults to Docker Hub",
    required: false,
    nullable: true
  })
  dockerRegistryUrl: string

  @IsString()
  @MinLength(100)
  @MaxLength(1000)
  @ApiProperty({
    description: "Description of the application, be descriptive"
  })
  description: string

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  @ApiProperty({
    description: "Spot identifier, a short description for listing"
  })
  spot: string

  @IsUrl()
  @ApiProperty({
    description: "URL to application logo"
  })
  logo: string

  @IsUrl()
  @ApiProperty({
    description: "URL to source code repository, maybe a git repository URL"
  })
  sourceCode: string

  @IsEnum(License)
  @ApiProperty({ description: "License type", enum: License })
  license: License

  @IsUrl()
  @IsOptional()
  @ApiProperty({
    description: "Application website URL",
    required: false,
    nullable: true
  })
  websiteUrl: string

  @IsUrl()
  @IsOptional()
  @ApiProperty({
    description: "Privacy policy URL",
    required: false,
    nullable: true
  })
  privacyPolicyUrl: string

  @IsUrl()
  @IsOptional()
  @ApiProperty({
    description: "Terms of service URL",
    required: false,
    nullable: true
  })
  termsOfServiceUrl: string

  @IsUrl()
  @IsOptional()
  @ApiProperty({ description: "Support URL", required: false, nullable: true })
  supportUrl: string

  @IsEmail()
  @IsOptional()
  @ApiProperty({
    description: "Support email address",
    required: false,
    nullable: true
  })
  supportEmail: string
}
