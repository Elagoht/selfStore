import { ValidationPipe } from "@nestjs/common"

export default new ValidationPipe({
  whitelist: true,
  transform: true,
  validateCustomDecorators: true
})
