import { Application } from "@prisma/client"
import { ApplicationCardResponse } from "src/resources/dtos/responses/application-card.dto"

class Transform {
  static toApplicationCardResponse(
    application: Application
  ): ApplicationCardResponse {
    return {
      license: application.license,
      name: application.name,
      reverseDomain: application.reverseDomain,
      spot: application.spot,
      logo: application.logo
    }
  }
}

export default Transform
