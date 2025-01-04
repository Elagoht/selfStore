import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { Developer, PrismaClient } from "@prisma/client"
import { compare, genSalt, hash } from "bcrypt"
import GoalKeeper from "src/utils/GoalKeeper"
import { LoginDeveloperDto } from "./dto/login-developer.dto"
import { RegisterDeveloperDto } from "./dto/register-developer.dto"

const prisma = new PrismaClient()

@Injectable()
export class DeveloperService {
  constructor(private jwtService: JwtService) {}

  async register(createDeveloperDto: RegisterDeveloperDto) {
    return await GoalKeeper.startShift(async () => {
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
    })
  }

  async login(loginDeveloperDto: LoginDeveloperDto) {
    const developer = await prisma.developer.findUnique({
      where: {
        email: loginDeveloperDto.email
      }
    })

    if (!developer) throw new NotFoundException("Developer not found")

    const isPasswordValid = await compare(
      loginDeveloperDto.passphrase,
      developer.passphrase
    )

    if (!isPasswordValid) throw new UnauthorizedException("Invalid passphrase")

    const token = this.generateToken(developer)

    return { token }
  }

  async getProfile(username: string) {
    const developer = await prisma.developer.findUnique({
      where: { username }
    })

    if (!developer) throw new NotFoundException("Check your authentication")

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

  private generateToken(developer: Developer) {
    const payload = {
      id: developer.id,
      email: developer.email,
      username: developer.username
    }
    return this.jwtService.sign(payload)
  }
}
