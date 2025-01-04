type AuthRequest = Request & {
  user: {
    id: string
    username: string
    email: string
  }
}
