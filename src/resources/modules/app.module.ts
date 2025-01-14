import { Module } from "@nestjs/common"
import { AdminModule } from "./admin.module"
import { AdminAuthModule } from "./adminAuth.module"
import { CreateRequestsModule } from "./create.module"
import { DeveloperModule } from "./developer.module"
import { StoreModule } from "./store.module"
import { UpdateRequestsModule } from "./updateRequests.module"

@Module({
  imports: [
    DeveloperModule,
    StoreModule,
    CreateRequestsModule,
    UpdateRequestsModule,
    AdminAuthModule,
    AdminModule
  ]
})
export class AppModule {}
