import { ApiProperty } from "@nestjs/swagger"
import { License } from "@prisma/client"

export class CreateApplicationDto {
  @ApiProperty({ description: "Name of the application" })
  name: string

  @ApiProperty({
    description: "Reverse domain notation identifier (e.g. com.example.app)"
  })
  reverseDomain: string

  @ApiProperty({ description: "Docker image user/organization" })
  dockerImageUser: string

  @ApiProperty({ description: "Docker image name" })
  dockerImageName: string

  @ApiProperty({ description: "Docker image tag" })
  dockerImageTag: string

  @ApiProperty({
    description: "Docker registry URL",
    required: false,
    nullable: true
  })
  dockerRegistryUrl: string

  @ApiProperty({ description: "Description of the application" })
  description: string

  @ApiProperty({ description: "Spot identifier" })
  spot: string

  @ApiProperty({ description: "URL to application logo" })
  logo: string

  @ApiProperty({ description: "URL to source code repository" })
  sourceCode: string

  @ApiProperty({ description: "License type", enum: License })
  license: License

  @ApiProperty({
    description: "Application website URL",
    required: false,
    nullable: true
  })
  websiteUrl: string

  @ApiProperty({
    description: "Privacy policy URL",
    required: false,
    nullable: true
  })
  privacyPolicyUrl: string

  @ApiProperty({
    description: "Terms of service URL",
    required: false,
    nullable: true
  })
  termsOfServiceUrl: string

  @ApiProperty({ description: "Support URL", required: false, nullable: true })
  supportUrl: string

  @ApiProperty({
    description: "Support email address",
    required: false,
    nullable: true
  })
  supportEmail: string
}
