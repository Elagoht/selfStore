import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { Developer, PrismaClient } from "@prisma/client"
import { compare, genSalt, hash } from "bcrypt"
import {
  ForbiddenException,
  UnauthorizedException
} from "../../errors/exceptions"
import { LoginDeveloperDto } from "./dto/login-developer.dto"
import { RegisterDeveloperDto } from "./dto/register-developer.dto"

const prisma = new PrismaClient()

@Injectable()
export class DeveloperService {
  constructor(private jwtService: JwtService) {}

  async register(createDeveloperDto: RegisterDeveloperDto) {
    const salt = await genSalt(10)
    const hashedPassphrase = await hash(createDeveloperDto.passphrase, salt)

    const developer = await prisma.developer.create({
      data: {
        username: createDeveloperDto.username,
        email: createDeveloperDto.email,
        passphrase: hashedPassphrase,
        gitProfileUrl: createDeveloperDto.gitProfileUrl,
        bio: createDeveloperDto.bio,
        websiteUrl: createDeveloperDto.websiteUrl,
        realName: createDeveloperDto.realName
      }
    })

    const token = this.generateToken(developer)
    return { token }
  }

  async login(loginDeveloperDto: LoginDeveloperDto) {
    const developer = await prisma.developer.findUnique({
      where: {
        email: loginDeveloperDto.email
      }
    })

    if (!developer)
      throw new UnauthorizedException("developers.invalidCredentials")

    const isPasswordValid = await compare(
      loginDeveloperDto.passphrase,
      developer.passphrase
    )

    if (!isPasswordValid)
      throw new UnauthorizedException("developers.invalidCredentials")

    const token = this.generateToken(developer)

    return { token }
  }

  async getProfile(id: string) {
    const developer = await prisma.developer.findUnique({
      where: { id }
    })

    if (!developer) throw new ForbiddenException("errors.forbidden")

    return {
      realName: developer.realName,
      username: developer.username,
      email: developer.email,
      gitProfileUrl: developer.gitProfileUrl,
      bio: developer.bio,
      websiteUrl: developer.websiteUrl,
      approved: developer.approved
    }
  }

  public static async isApproved(id: string) {
    const developer = await prisma.developer.findUnique({
      where: { id }
    })
    return developer?.approved
  }

  private generateToken(developer: Developer) {
    const payload = {
      sub: developer.id,
      username: developer.username
    }
    return this.jwtService.sign(payload)
  }
}
