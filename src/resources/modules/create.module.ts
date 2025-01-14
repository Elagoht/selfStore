import { Module } from "@nestjs/common"
import { CreateRequestsController } from "../controllers/createRequests.controller"
import { ApplicationsService } from "../services/applications.service"

@Module({
  controllers: [CreateRequestsController],
  providers: [ApplicationsService]
})
export class CreateRequestsModule {}
