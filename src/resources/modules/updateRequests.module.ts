import { Module } from "@nestjs/common"
import UpdateRequestsController from "../controllers/updateRequests.controller"
import { ApplicationsService } from "../services/applications.service"

@Module({
  controllers: [UpdateRequestsController],
  providers: [ApplicationsService]
})
export class UpdateRequestsModule {}
