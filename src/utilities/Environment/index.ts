class Environment {
  public static readonly PORT = Number(process.env.PORT)
  public static readonly JWT_SECRET = process.env.JWT_SECRET
  public static readonly JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME
  public static readonly PAGINATE_BY = Number(process.env.PAGINATE_BY)

  public static check(): void {
    const keys = ["PORT", "JWT_SECRET", "JWT_EXPIRATION_TIME", "PAGINATE_BY"]
    const numbers = ["PORT", "PAGINATE_BY"]

    keys.forEach((key) => Environment.checkIsExisting(process.env[key], key))
    numbers.forEach((key) => Environment.checkIsNumber(process.env[key], key))
  }

  private static checkIsNumber(value: any, name: string) {
    if (Number.isNaN(value))
      throw new EnvironmentError(`${name} is not a number`)
  }

  private static checkIsExisting(value: any, name: string) {
    if (!value) throw new EnvironmentError(`${name} is not set`)
  }
}

class EnvironmentError extends Error {
  public constructor(message: string) {
    super(message)
    this.name = "EnvironmentError"
  }
}

export default Environment
