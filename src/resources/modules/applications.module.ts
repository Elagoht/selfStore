import { Module } from "@nestjs/common"
import { StoreController } from "src/resources/controllers/store.controller"
import { CreateRequestsController } from "../controllers/createRequests.controller"
import UpdateRequestsController from "../controllers/updateRequests.controller"
import { ApplicationsService } from "../services/applications.service"

@Module({
  controllers: [
    CreateRequestsController,
    UpdateRequestsController,
    StoreController
  ],
  providers: [ApplicationsService]
})
export class ApplicationsModule {}
