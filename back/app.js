const express = require("express");
const app = express();
const errorMiddleware = require('./middleware/errors')
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(cookieParser());

//importamos las rutas
const productos = require ("./routes/products")
const usuarios = require ("./routes/auth")
const ordenes = require ('./routes/orders')

//sujeto a la desicion del navegador
app.use('/api',productos)
app.use('/api',usuarios)
app.use('/api',ordenes)

//Middlware para manejar errores
app.use(errorMiddleware)


module.exports = app