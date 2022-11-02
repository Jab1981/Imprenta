const express = require("express");
const app = express();

app.use(express.json());

//importamos las rutas
const productos = require ("./routes/products")

//sujeto a la desicion del navegador
app.use('/api',productos)

module.exports = app