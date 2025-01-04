import { Module } from "@nestjs/common"
import { AdminModule } from "../admin/admin.module"
import { DeveloperModule } from "../developer/developer.module"
import { ApplicationsModule } from "../applications/applications.module"

@Module({
  imports: [ApplicationsModule, AdminModule, DeveloperModule],
  controllers: [],
  providers: []
})
export class AppModule {}
