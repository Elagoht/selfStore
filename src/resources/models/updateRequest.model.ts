import { ApiProperty } from "@nestjs/swagger"
import { License, UpdateRequestStatus } from "@prisma/client"

export class ApplicationUpdateRequest {
  @ApiProperty({
    description: "ID of the update request",
    example: "123e4567-e89b-12d3-a456-426614174000"
  })
  id: string

  @ApiProperty({
    description: "ID of the application that this update request is for",
    example: "123e4567-e89b-12d3-a456-426614174000"
  })
  applicationId: string

  @ApiProperty({
    description: "Name of the application",
    example: "My App"
  })
  name: string | null

  @ApiProperty({
    description: "Docker image tag of the application",
    example: "latest"
  })
  dockerImageTag: string | null

  @ApiProperty({
    description: "Docker registry URL of the application",
    example: "https://hub.docker.com/r/furkanbaytekin/my-app"
  })
  dockerRegistryUrl: string | null

  @ApiProperty({
    description: "Description of the application",
    example: "My App is a web application that allows you to manage your tasks"
  })
  description: string | null

  @ApiProperty({
    description: "Logo of the application",
    example: "https://myapp.com/logo.png"
  })
  logo: string | null

  @ApiProperty({
    description: "Source code URL of the application",
    example: "https://github.com/furkanbaytekin/my-app"
  })
  sourceCode: string | null

  @ApiProperty({
    description: "Website URL of the application",
    example: "https://myapp.com"
  })
  websiteUrl: string | null

  @ApiProperty({
    description: "Privacy policy URL of the application",
    example: "https://myapp.com/privacy"
  })
  privacyPolicyUrl: string | null

  @ApiProperty({
    description: "Terms of service URL of the application",
    example: "https://myapp.com/terms"
  })
  termsOfServiceUrl: string | null

  @ApiProperty({
    description: "Support URL of the application",
    example: "https://myapp.com/support"
  })
  supportUrl: string | null

  @ApiProperty({
    description: "Support email of the application",
    example: "support@myapp.com"
  })
  supportEmail: string | null

  @ApiProperty({
    description: "License of the application",
    example: "MIT",
    enum: License
  })
  license: License | null

  @ApiProperty({
    description: "Status of the update request",
    example: "PENDING",
    enum: UpdateRequestStatus
  })
  status: UpdateRequestStatus

  @ApiProperty({
    description: "Admin notes of the update request",
    example: "This is a note",
    nullable: true
  })
  adminNotes: string | null

  @ApiProperty({
    description: "Created date of the update request",
    example: "2024-01-01T00:00:00.000Z"
  })
  createdAt: Date

  @ApiProperty({
    description: "Updated date of the update request",
    example: "2024-01-01T00:00:00.000Z"
  })
  updatedAt: Date

  @ApiProperty({
    description: "Reviewed date of the update request",
    example: "2024-01-01T00:00:00.000Z",
    nullable: true
  })
  reviewedAt: Date | null
}
