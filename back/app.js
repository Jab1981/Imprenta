const express = require("express");
const app = express();
const errorMiddleware = require('./middleware/errors')

app.use(express.json());

//importamos las rutas
const productos = require ("./routes/products")
const usuarios = require ("./routes/auth")

//sujeto a la desicion del navegador
app.use('/api',productos)
app.use('/api',usuarios)

//Middlware para manejar errores
app.use(errorMiddleware)


module.exports = app