import { ApiProperty } from "@nestjs/swagger"

export class AdminTokenResponse {
  @ApiProperty({ description: "The token of the admin" })
  token: string

  @ApiProperty({ description: "The expiration date of the token" })
  expiresAt: Date
}
