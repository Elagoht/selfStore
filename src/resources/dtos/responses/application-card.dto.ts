import { ApiProperty } from "@nestjs/swagger"
import { License } from "@prisma/client"

export class ApplicationCardResponse {
  @ApiProperty({ description: "Name of the application" })
  name: string

  @ApiProperty({
    description: "Reverse domain notation identifier CANNOT BE CHANGED LATER!",
    example: "com.example.app"
  })
  reverseDomain: string

  @ApiProperty({
    description: "Spot identifier, a short description for listing"
  })
  spot: string

  @ApiProperty({
    description: "URL to application logo"
  })
  logo: string

  @ApiProperty({ description: "License type", enum: License })
  license: License
}
