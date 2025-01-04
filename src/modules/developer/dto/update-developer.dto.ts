import { PartialType } from "@nestjs/swagger"
import { RegisterDeveloperDto } from "./register-developer.dto"

export class UpdateDeveloperDto extends PartialType(RegisterDeveloperDto) {}
