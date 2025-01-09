/* eslint-disable no-console */

class Printer {
  public static info(message: string) {
    this.print("[INFO]: ", "blue")
    console.log(message)
  }

  public static success(message: string) {
    this.print("[SUCCESS]: ", "green")
    console.log(message)
  }

  public static error(message: string) {
    this.print("[ERROR]: ", "red")
    console.error(message)
  }

  public static warn(message: string) {
    this.print("[WARN]: ", "yellow")
    console.warn(message)
  }

  public static debug(message: any) {
    this.print("[DEBUG]: ", "cyan")
    console.debug(message)
  }

  private static readonly colors = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
    reset: "\x1b[0m"
  }

  private static print(message: string, color: keyof typeof this.colors) {
    process.stdout.write(
      `${this.colors[color]}[${new Date().toISOString()}]-${
        message
      }${this.colors.reset}`
    )
  }
}

export default Printer
