interface NestRequest extends Express.Request {
  acceptLanguage: string
}

interface AuthRequest extends NestRequest {
  user: {
    sub: string
    username: string
    approved: boolean
  }
}
