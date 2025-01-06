class Printer {
  public static info(message: string) {
    this.print(`[INFO]: ${message}`, "blue")
  }

  public static success(message: string) {
    this.print(`[SUCCESS]: ${message}`, "green")
  }

  public static error(message: string) {
    this.print(`[ERROR]: ${message}`, "red")
  }

  public static warn(message: string) {
    this.print(`[WARN]: ${message}`, "yellow")
  }

  public static debug(message: string) {
    this.print(`[DEBUG]: ${message}`, "magenta")
  }

  private static readonly colors = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    reset: "\x1b[0m"
  }

  private static print(message: string, color: keyof typeof this.colors) {
    // eslint-disable-next-line no-console
    console.log(`${this.colors[color]}${message}${this.colors.reset}`)
  }
}

export default Printer
