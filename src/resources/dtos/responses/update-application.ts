import { ApiProperty } from "@nestjs/swagger"
import { UpdateRequestStatus } from "@prisma/client"

class ExistingApplicationListDetails {
  @ApiProperty({
    description: "The logo of the application"
  })
  logo: string

  @ApiProperty({
    description: "The reverse domain of the application"
  })
  reverseDomain: string

  @ApiProperty({
    description: "The spot of the application"
  })
  spot: string
}

export class UpdateApplicationResponse {
  @ApiProperty({
    description: "The id of the update request",
    example: "123"
  })
  id: string

  @ApiProperty({
    description: "The status of the update request",
    example: UpdateRequestStatus.PENDING,
    enum: UpdateRequestStatus
  })
  status: UpdateRequestStatus

  @ApiProperty({
    description: "The created date of the update request"
  })
  createdAt: Date

  @ApiProperty({
    description: "The updated date of the update request"
  })
  updatedAt: Date

  @ApiProperty({
    description: "The existing details of the application before the update",
    type: ExistingApplicationListDetails
  })
  application: ExistingApplicationListDetails
}
