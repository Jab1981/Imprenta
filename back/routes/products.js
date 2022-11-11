const express = require ("express")
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
//se trae una respuesta json desde el controlador
const {getProducts, newProduct, getProductById, updateProduct, deleteProduct} = require ("../controllers/productsController");


//establecemos la ruta para ver getProducts
router.route('/productos').get(isAuthenticatedUser,getProducts)

//establecemos la ruta
router.route('/producto/nuevo').post(newProduct);

//establecemos la ruta para consulta por Id 
router.route('/producto/:id').get(getProductById);

//establecemos la ruta para actualizacion producto
router.route('/producto/:id').put(updateProduct);

//establecemos la ruta para la eliminacion producto
router.route('/producto/:id').delete(deleteProduct);

module.exports = router;