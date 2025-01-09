import {
  BadRequestException as BadReq,
  ConflictException as Conflict,
  ForbiddenException as Forbidden,
  InternalServerErrorException as Internal,
  NotFoundException as NotFound,
  UnauthorizedException as Unauth
} from "@nestjs/common"

export class BadRequestException extends BadReq {
  constructor(message: Dictionary) {
    super(message)
  }
}

export class NotFoundException extends NotFound {
  constructor(message: Dictionary) {
    super(message)
  }
}

export class UnauthorizedException extends Unauth {
  constructor(message: Dictionary) {
    super(message)
  }
}

export class ForbiddenException extends Forbidden {
  constructor(message: Dictionary) {
    super(message)
  }
}

export class ConflictException extends Conflict {
  constructor(message: Dictionary) {
    super(message)
  }
}

export class InternalServerErrorException extends Internal {
  constructor(message: Dictionary) {
    super(message)
  }
}
