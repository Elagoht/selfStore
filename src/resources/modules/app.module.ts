import { Module } from "@nestjs/common"
import { AdminModule } from "./admin.module"
import { ApplicationsModule } from "./applications.module"
import { DeveloperModule } from "./developer.module"

@Module({
  imports: [ApplicationsModule, AdminModule, DeveloperModule]
})
export class AppModule {}
