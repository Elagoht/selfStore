type AuthRequest = Request & {
  user: {
    username: string
    email: string
  }
}
