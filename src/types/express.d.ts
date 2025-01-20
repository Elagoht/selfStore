interface AuthRequest extends Express.Request {
  user: {
    sub: string
    username: string
    isAdmin: boolean
  }
}
