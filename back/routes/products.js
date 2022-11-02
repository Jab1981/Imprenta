const express = require ("express")
const router = express.Router();

//se trae una respuesta json desde el controlador
const {getProducts} = require ("../controllers/productsController")

//establecemos la ruta para ver getProducts
router.route('/productos').get(getProducts)

module.exports = router;