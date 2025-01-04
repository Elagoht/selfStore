import { ApiProperty } from "@nestjs/swagger"

export class Developer {
  @ApiProperty({
    description: "Unique identifier of the developer",
    example: "123e4567-e89b-12d3-a456-426614174000"
  })
  id: string

  @ApiProperty({
    description: "Username of the developer",
    example: "Elagoht"
  })
  username: string

  @ApiProperty({
    description: "Real name of the developer if they want to be displayed",
    example: "Furkan",
    nullable: true
  })
  realName: string | null

  @ApiProperty({
    description: "Email address of the developer",
    example: "furkanbaytekin@gmail.com"
  })
  email: string

  @ApiProperty({
    description: "Passphrase of the developer",
    example: "aR€4lLy$₺r0nGP4s$PHr4$€"
  })
  passphrase: string

  @ApiProperty({
    description: "Git profile URL of the developer to provide confidence",
    example: "https://github.com/Elagoht"
  })
  gitProfileUrl: string

  @ApiProperty({
    description: "Bio of the developer",
    example: "Hello, I'm Furkan. I'm the creator of this platform.",
    nullable: true
  })
  bio: string | null

  @ApiProperty({
    description: "Website URL of the developer",
    example: "https://furkanbaytekin.dev",
    nullable: true
  })
  websiteUrl: string | null

  @ApiProperty({
    description: "Created date of the developer",
    example: "2024-01-01T00:00:00.000Z"
  })
  createdAt: Date

  @ApiProperty({
    description: "Updated date of the developer",
    example: "2024-01-01T00:00:00.000Z"
  })
  updatedAt: Date

  @ApiProperty({
    description: "Deleted date of the developer",
    example: null,
    nullable: true
  })
  deletedAt: Date | null

  @ApiProperty({
    description: "Last login date of the developer",
    example: "2024-01-01T00:00:00.000Z"
  })
  lastLogin: Date
}
