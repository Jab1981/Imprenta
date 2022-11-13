const express = require ("express");
const { newOrder, getOneOrder, myOrders, allOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

//rutas de ordenes usuario
router.route('/order/new').post(isAuthenticatedUser, newOrder)
router.route('/order/:id').get(isAuthenticatedUser, getOneOrder)
router.route('/orders/user').get(isAuthenticatedUser, myOrders)

//rutas de ordenes de administrador
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), allOrders)
router.route('/admin/orders/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
router.route('/admin/orders/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder)

module.exports = router;