class Environment {
  public static readonly PORT = Number(process.env.PORT)
  public static readonly JWT_SECRET = process.env.JWT_SECRET
  public static readonly JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME

  public static check() {
    if (!Environment.PORT) throw new EnvironmentError("PORT is not set")
    if (isNaN(Environment.PORT))
      throw new EnvironmentError("PORT is not a number")
    if (!Environment.JWT_SECRET)
      throw new EnvironmentError("JWT_SECRET is not set")
    if (!Environment.JWT_EXPIRATION_TIME)
      throw new EnvironmentError("JWT_EXPIRATION_TIME is not set")
  }
}

class EnvironmentError extends Error {
  public constructor(message: string) {
    super(message)
    this.name = "EnvironmentError"
  }
}

export default Environment
