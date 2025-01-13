import { ApiProperty } from "@nestjs/swagger"
import { License } from "@prisma/client"

export class Application {
  @ApiProperty({ description: "Unique identifier" })
  id: string

  @ApiProperty({ description: "Name of the application" })
  name: string

  @ApiProperty({ description: "Reverse domain notation identifier" })
  reverseDomain: string

  @ApiProperty({ description: "Docker image user/organization" })
  dockerImageUser: string

  @ApiProperty({ description: "Docker image name" })
  dockerImageName: string

  @ApiProperty({ description: "Docker image tag" })
  dockerImageTag: string

  @ApiProperty({ description: "Docker registry URL", nullable: true })
  dockerRegistryUrl: string

  @ApiProperty({ description: "Description of the application" })
  description: string

  @ApiProperty({ description: "Spot identifier" })
  spot: string

  @ApiProperty({ description: "URL to application logo" })
  logo: string

  @ApiProperty({ description: "Creation timestamp" })
  createdAt: Date

  @ApiProperty({ description: "Last update timestamp" })
  updatedAt: Date

  @ApiProperty({ description: "Deletion timestamp", nullable: true })
  deletedAt: Date

  @ApiProperty({ description: "Last login timestamp" })
  lastLogin: Date

  @ApiProperty({ description: "Whether this application is editor's choice" })
  editorsChoice: boolean

  @ApiProperty({ description: "URL to source code repository" })
  sourceCode: string

  @ApiProperty({
    description: "License type",
    enum: License,
    enumName: "License",
    examples: [
      "GPLv3",
      "GPLv2",
      "MIT",
      "APACHE",
      "BSD",
      "CC0",
      "UNLICENSED",
      "OTHER"
    ]
  })
  license: License

  @ApiProperty({ description: "Application website URL", nullable: true })
  websiteUrl: string

  @ApiProperty({ description: "Privacy policy URL", nullable: true })
  privacyPolicyUrl: string

  @ApiProperty({ description: "Terms of service URL", nullable: true })
  termsOfServiceUrl: string

  @ApiProperty({ description: "Support URL", nullable: true })
  supportUrl: string

  @ApiProperty({ description: "Support email address", nullable: true })
  supportEmail: string
}
