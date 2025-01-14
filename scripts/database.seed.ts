import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const EXPIRATION_TIME = 1000 * 60 * 60 * 24

async function seedDatabase() {
  const token = await prisma.adminRegisterTokens.create({
    data: {
      expiresAt: new Date(Date.now() + EXPIRATION_TIME)
    }
  })

  process.stdout.write(`${token.token}\n`)
}

seedDatabase()
