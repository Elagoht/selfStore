import { Module } from "@nestjs/common"
import { ApplicationsController } from "src/resources/controllers/applications.controller"
import { ApplicationsService } from "../services/applications.service"

@Module({
  controllers: [ApplicationsController],
  providers: [ApplicationsService]
})
export class ApplicationsModule {}
