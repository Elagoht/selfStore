import { Module } from "@nestjs/common"
import { StoreController } from "src/resources/controllers/store.controller"
import { ApplicationsService } from "../services/applications.service"

@Module({
  controllers: [StoreController],
  providers: [ApplicationsService]
})
export class StoreModule {}
