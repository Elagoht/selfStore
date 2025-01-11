/* eslint-disable no-console */

class Printer {
  public static info(message: any) {
    this.print("[INFO]: ", "blue")
    console.log(message)
  }

  public static success(message: any) {
    this.print("[SUCCESS]: ", "green")
    console.log(message)
  }

  public static error(message: any) {
    this.print("[ERROR]: ", "red")
    console.error(message)
  }

  public static warn(message: any) {
    this.print("[WARN]: ", "yellow")
    console.warn(message)
  }

  public static debug(message: any) {
    this.print("[DEBUG]: ", "magenta")
    console.debug(message)
  }

  private static readonly colors = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    reset: "\x1b[0m"
  }

  private static print(message: any, color: keyof typeof this.colors) {
    process.stdout.write(
      `${this.colors[color]}[${new Date().toISOString()}]-${
        message
      }${this.colors.reset}`
    )
  }
}

export default Printer
