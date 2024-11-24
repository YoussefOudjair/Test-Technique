const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// fichiers de React
app.use(express.static(path.join(__dirname, 'build')));

// Gestion des requêtes 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/products', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// Modèle de données pour les produits
const Product = mongoose.model('Product', new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  rating: Number,
  warranty_years: Number,
  available: Boolean
}));

app.use(express.json()); // Middleware pour parser le JSON

// Route API pour récupérer tous les produits
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send("Error fetching products: " + error);
  }
});


// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
