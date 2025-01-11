import { ApiProperty } from "@nestjs/swagger"
import { License } from "@prisma/client"
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength
} from "class-validator"

export class UpdateApplicationDto {
  @IsString({ message: "validations.common|field=name" })
  @MaxLength(100, { message: "validations.generic.max|max=100,field=name" })
  @IsOptional()
  @ApiProperty({
    description: "Name of the application",
    required: false,
    nullable: true
  })
  name: string

  @IsString({ message: "validations.common|field=dockerImageUser" })
  @MaxLength(100, {
    message: "validations.generic.max|max=100,field=dockerImageUser"
  })
  @ApiProperty({
    description: "Docker image user part of user/application:tag",
    required: false,
    nullable: true
  })
  @IsOptional()
  dockerImageUser: string

  @IsString({ message: "validations.common|field=dockerImageName" })
  @MaxLength(100, {
    message: "validations.generic.max|max=100,field=dockerImageName"
  })
  @ApiProperty({
    description: "Docker image name part of user/application:tag",
    required: false,
    nullable: true
  })
  @IsOptional()
  dockerImageName: string

  @IsString({ message: "validations.common|field=dockerImageTag" })
  @MaxLength(100, {
    message: "validations.generic.max|max=100,field=dockerImageTag"
  })
  @IsOptional()
  @ApiProperty({ description: "Docker image tag part of user/application:tag" })
  dockerImageTag: string

  @IsUrl({}, { message: "validations.url|field=dockerRegistryUrl" })
  @ApiProperty({
    description: "Docker registry URL, defaults to Docker Hub",
    required: false,
    nullable: true
  })
  @IsOptional()
  dockerRegistryUrl: string

  @IsString({ message: "validations.common|field=description" })
  @MinLength(100, {
    message: "validations.generic.min|min=100,field=description"
  })
  @MaxLength(1000, {
    message: "validations.generic.max|max=1000,field=description"
  })
  @ApiProperty({
    description: "Description of the application, be descriptive",
    required: false,
    nullable: true
  })
  @IsOptional()
  description: string

  @IsString({ message: "validations.common|field=spot" })
  @MinLength(1, { message: "validations.generic.required|min=1,field=spot" })
  @MaxLength(100, {
    message: "validations.generic.max|max=100,field=spot"
  })
  @IsOptional()
  @ApiProperty({
    description: "Spot identifier, a short description for listing",
    required: false,
    nullable: true
  })
  spot: string

  @IsUrl({}, { message: "validations.url|field=logo" })
  @IsOptional()
  @ApiProperty({
    description: "URL to application logo",
    required: false,
    nullable: true
  })
  logo: string

  @IsUrl({}, { message: "validations.url|field=sourceCode" })
  @ApiProperty({
    description: "URL to source code repository, maybe a git repository URL",
    required: false,
    nullable: true
  })
  @IsOptional()
  sourceCode: string

  @IsEnum(License, { message: "validations.license|field=license" })
  @IsOptional()
  @ApiProperty({ description: "License type", enum: License })
  license: License

  @IsUrl({}, { message: "validations.url|field=websiteUrl" })
  @IsOptional()
  @ApiProperty({
    description: "Application website URL",
    required: false,
    nullable: true
  })
  websiteUrl: string

  @IsUrl({}, { message: "validations.url|field=privacyPolicyUrl" })
  @IsOptional()
  @ApiProperty({
    description: "Privacy policy URL",
    required: false,
    nullable: true
  })
  privacyPolicyUrl: string

  @IsUrl({}, { message: "validations.url|field=termsOfServiceUrl" })
  @IsOptional()
  @ApiProperty({
    description: "Terms of service URL",
    required: false,
    nullable: true
  })
  termsOfServiceUrl: string

  @IsUrl({}, { message: "validations.url|field=supportUrl" })
  @IsOptional()
  @ApiProperty({ description: "Support URL", required: false, nullable: true })
  supportUrl: string

  @IsEmail({}, { message: "validations.email|field=supportEmail" })
  @IsOptional()
  @ApiProperty({
    description: "Support email address",
    required: false,
    nullable: true
  })
  supportEmail: string
}
