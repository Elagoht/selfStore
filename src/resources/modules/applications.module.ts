import { Module } from "@nestjs/common"
import { ApplicationsController } from "src/resources/controllers/applications.controller"
import { CreateRequestsController } from "../controllers/createRequests.controller"
import UpdateRequestsController from "../controllers/updateRequests.controller"
import { ApplicationsService } from "../services/applications.service"

@Module({
  controllers: [
    CreateRequestsController,
    UpdateRequestsController,
    ApplicationsController
  ],
  providers: [ApplicationsService]
})
export class ApplicationsModule {}
