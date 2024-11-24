const mongoose = require('mongoose');

// Définition du schéma des produits
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    warranty_years: { type: Number, required: true },
    available: { type: Boolean, required: true },
});

module.exports = mongoose.model('Product', ProductSchema);
