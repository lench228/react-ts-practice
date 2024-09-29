const Product = require("../models/product-model");
const brypt = require("bcrypt");
const TokenService = require("./token-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");

class ProductsService {
    async getAll() {
        try {
            return await Product.find({});

        } catch {
            throw new Error("Failed to register user");
        }
    }
}

module.exports = new ProductsService();
