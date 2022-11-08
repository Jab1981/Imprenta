const express = require("express");
const app = express();
const errorMiddleware = require('./middleware/errors')

app.use(express.json());

//importamos las rutas
const productos = require ("./routes/products")

//sujeto a la desicion del navegador
app.use('/api',productos)

//Middlware para manejar errores
app.use(errorMiddleware)


module.exports = app