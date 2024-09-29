const ProductsService = require("../services/Products-service");
const {GridFSBucket} = require('mongodb');
const mongoose = require('mongoose');

class ProductsController {
    async getAll(req, res) {
        try {
            res.json(await ProductsService.getAll());
        } catch (error) {

            throw new Error("Не удалось получить продукты1 ");
        }
    }
}

module.exports = new ProductsController();
