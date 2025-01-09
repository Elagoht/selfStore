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
  @IsString({ message: "validations.common|field=name" })
  @MaxLength(100, { message: "validations.generic.max|max=100,field=name" })
  @ApiProperty({ description: "Name of the application" })
  name: string

  @IsString({ message: "validations.common|field=reverseDomain" })
  @MinLength(8, {
    message: "validations.generic.min|min=8,field=reverseDomain"
  })
  @MaxLength(100, {
    message: "validations.generic.max|max=100,field=reverseDomain"
  })
  @Matches(/^[a-z0-9]+\.[a-z0-9]+\.[a-z0-9]+$/, {
    message: "validations.reverseDomain|field=reverseDomain"
  })
  @ApiProperty({
    description: "Reverse domain notation identifier (e.g. com.example.app)"
  })
  reverseDomain: string

  @IsString({ message: "validations.common|field=dockerImageUser" })
  @MaxLength(100, {
    message: "validations.generic.max|max=100,field=dockerImageUser"
  })
  @ApiProperty({
    description: "Docker image user part of user/application:tag"
  })
  dockerImageUser: string

  @IsString({ message: "validations.common|field=dockerImageName" })
  @MaxLength(100, {
    message: "validations.generic.max|max=100,field=dockerImageName"
  })
  @ApiProperty({
    description: "Docker image name part of user/application:tag"
  })
  dockerImageName: string

  @IsString({ message: "validations.common|field=dockerImageTag" })
  @MaxLength(100, {
    message: "validations.generic.max|max=100,field=dockerImageTag"
  })
  @ApiProperty({ description: "Docker image tag part of user/application:tag" })
  dockerImageTag: string

  @IsUrl({}, { message: "validations.url|field=dockerRegistryUrl" })
  @ApiProperty({
    description: "Docker registry URL, defaults to Docker Hub",
    required: false,
    nullable: true
  })
  dockerRegistryUrl: string

  @IsString({ message: "validations.common|field=description" })
  @MinLength(100, {
    message: "validations.generic.min|min=100,field=description"
  })
  @MaxLength(1000, {
    message: "validations.generic.max|max=1000,field=description"
  })
  @ApiProperty({
    description: "Description of the application, be descriptive"
  })
  description: string

  @IsString({ message: "validations.common|field=spot" })
  @MinLength(1, { message: "validations.generic.required|min=1,field=spot" })
  @MaxLength(100, {
    message: "validations.generic.max|max=100,field=spot"
  })
  @ApiProperty({
    description: "Spot identifier, a short description for listing"
  })
  spot: string

  @IsUrl({}, { message: "validations.url|field=logo" })
  @ApiProperty({
    description: "URL to application logo"
  })
  logo: string

  @IsUrl({}, { message: "validations.url|field=sourceCode" })
  @ApiProperty({
    description: "URL to source code repository, maybe a git repository URL"
  })
  sourceCode: string

  @IsEnum(License, { message: "validations.license|field=license" })
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
