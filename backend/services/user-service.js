const UserModel = require("../models/user-model");
const brypt = require("bcrypt");
const TokenService = require("./token-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
class UserService {
  async registration(email, password) {
    try {
      const condidate = await UserModel.findOne({ email });
      console.log(condidate);
      if (condidate) {
        return { error: "Почта занята" };
      }
      const hashPassword = await brypt.hash(password, 3);

      const user = await UserModel.create({ email, password: hashPassword });
      const userDto = new UserDto(user);

      const tokens = tokenService.generateTokens({ ...userDto });
      console.log(1);
      await TokenService.saveToken(userDto.id, tokens.refreshToken);
      console.log(tokens, userDto);

      return {
        ...tokens,
        user: userDto,
      };
    } catch {
      throw new Error("Failed to register user");
    }
  }
}

module.exports = new UserService();
