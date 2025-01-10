import Environment from "src/utilities/Environment"

export const jwtConfig = {
  secret: Environment.JWT_SECRET,
  expiresIn: Environment.JWT_EXPIRATION_TIME
}
