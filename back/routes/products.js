const express = require ("express")
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
//se trae una respuesta json desde el controlador
const {getProducts, newProduct, getProductById, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReview} = require ("../controllers/productsController");


//establecemos la ruta para ver getProducts
router.route('/productos').get(getProducts)

//establecemos la ruta
router.route('/producto/nuevo').post(isAuthenticatedUser, authorizeRoles('admin'),newProduct);

//establecemos la ruta para consulta por Id 
router.route('/producto/:id').get(getProductById);

//establecemos la ruta para actualizacion producto
router.route('/producto/:id').put(isAuthenticatedUser, authorizeRoles('admin'),updateProduct);

//establecemos la ruta para la eliminacion producto
router.route('/producto/:id').delete(isAuthenticatedUser, authorizeRoles('admin'),deleteProduct);

//establecemos la ruta de review
router.route('/review').put(isAuthenticatedUser, createProductReview);

//establecemos la ruta para ver reviews
router.route('/reviews').get(isAuthenticatedUser, getProductReviews);

//establecemos la ruta para eliminar reviews
router.route('/review').delete(isAuthenticatedUser, deleteReview);

module.exports = router;