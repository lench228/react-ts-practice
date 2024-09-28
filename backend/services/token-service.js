const jwt = require("jsonwebtoken");
const TokenModel = require("../models/token-model");
class TokenService {
  generateTokens(payload) {
    try {
      console.log(payload);
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "30m",
      });
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "30d",
      });

      return {
        accessToken,
        refreshToken,
      };
    } catch {
      throw new Error("Failed to generate tokens");
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenModel.create({ user: userId, refreshToken });
    return token;
  }
}

module.exports = new TokenService();
