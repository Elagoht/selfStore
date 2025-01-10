import { ApiProperty } from "@nestjs/swagger"

export class StatusDeveloperDto {
  @ApiProperty({
    description: "The id of the developer",
    example: "a453964d-8453-..."
  })
  id: string

  @ApiProperty({
    description: "The status of the developer",
    example: true
  })
  approved: boolean
}
