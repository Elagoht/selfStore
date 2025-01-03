import { Module } from "@nestjs/common"
import { ApplicationsModule } from "./applications/applications.module"
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [ApplicationsModule, AdminModule],
  controllers: [],
  providers: []
})
export class AppModule {}
