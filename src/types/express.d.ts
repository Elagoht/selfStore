interface NestRequest extends Express.Request {
  acceptLanguage: string
}

interface AuthRequest extends NestRequest {
  user: {
    id: string
    username: string
    email: string
    approved: boolean
  }
}
