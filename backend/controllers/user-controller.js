const userService = require("../services/user-service");
const { validationResult } = require("express-validator");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(errors.array());
      }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });


      return res.json(userData);
    } catch (e) {}
  }
  async login(req, res) {
    try {
    } catch (e) {}
  }
  async logout(req, res) {
    try {
    } catch (e) {}
  }
  async refresh(req, res) {
    try {
    } catch (e) {}
  }
  async getUsers(req, res) {
    try {
      res.json([12, 123, 123]);
    } catch (e) {}
  }
}
module.exports = new UserController();
