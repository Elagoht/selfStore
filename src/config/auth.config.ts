import Environment from "src/utils/Environment"

export const jwtConfig = {
  secret: Environment.JWT_SECRET,
  expiresIn: Environment.JWT_EXPIRATION_TIME
}
