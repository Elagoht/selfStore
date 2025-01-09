import { Module } from "@nestjs/common"
import { AdminModule } from "../admin/admin.module"
import { ApplicationsModule } from "../applications/applications.module"
import { DeveloperModule } from "../developer/developer.module"

@Module({
  imports: [ApplicationsModule, AdminModule, DeveloperModule]
})
export class AppModule {}
