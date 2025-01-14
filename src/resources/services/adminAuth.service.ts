import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { Admin, PrismaClient } from "@prisma/client"
import { ForbiddenException } from "src/utilities/Exceptions"

const prisma = new PrismaClient()

@Injectable()
export class AdminAuthService {
  public constructor(private readonly jwtService: JwtService) {}

  public async registerToken() {
    return await prisma.adminRegisterTokens.create({
      data: { expiresAt: new Date(Date.now() + this.TOKEN_AGE) }
    })
  }

  private TOKEN_AGE = 1000 * 60 * 60 * 24

  public async registerAdmin(token: string, email: string, passphrase: string) {
    this.deleteExpiredTokens()

    const record = await prisma.adminRegisterTokens.findUnique({
      where: { token }
    })

    if (!record) throw new ForbiddenException("adminAuth.tokenInvalid")

    if (await this.isTokenExpired(token)) {
      throw new ForbiddenException("adminAuth.tokenExpired")
    }

    const admin = await prisma.admin.create({
      data: {
        email,
        passphrase,
        username: email.split("@")[0]
      }
    })

    this.deleteToken(token)

    return this.generateJWT(admin)
  }

  public async loginAdmin(email: string, passphrase: string) {
    const admin = await prisma.admin.findUnique({
      where: { email }
    })

    if (!admin) throw new ForbiddenException("adminAuth.invalidCredentials")

    if (admin.passphrase !== passphrase)
      throw new ForbiddenException("adminAuth.invalidCredentials")

    return this.generateJWT(admin)
  }

  /**
   * Do not await this function and block the response
   */
  private deleteToken(token: string) {
    prisma.adminRegisterTokens.delete({
      where: { token }
    })
  }

  private deleteExpiredTokens() {
    prisma.adminRegisterTokens.deleteMany({
      where: { expiresAt: { lt: new Date() } }
    })
  }

  private async isTokenExpired(token: string) {
    const record = await prisma.adminRegisterTokens.findUnique({
      where: { token }
    })

    if (!record) return true
    return record.expiresAt < new Date()
  }

  private generateJWT(admin: Admin) {
    const payload = {
      sub: admin.id,
      username: admin.username
    }
    return this.jwtService.sign(payload)
  }
}
