const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    imageId: {type: mongoose.Schema.Types.ObjectId, required: true},
    price: {type: Number, required: true},
    color: {type: String, required: false},
    type: {type: String, required: true},
});

module.exports = mongoose.model('Product', ProductSchema);
