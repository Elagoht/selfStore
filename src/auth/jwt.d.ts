type AuthRequest = Express.Request & {
  user: {
    id: string
    username: string
    email: string
    approved: boolean
  }
}
