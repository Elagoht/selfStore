import { Module } from "@nestjs/common"
import { AdminController } from "src/resources/controllers/admin.controller"
import { AdminService } from "../services/admin.service"

@Module({
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
