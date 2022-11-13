const Order = require('../models/order')
const Product = require('../models/productos')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const { create } = require('../models/order');
const ErrorHandler = require('../utils/errorHandler');
const { response } = require('../app');

//crear orden de compra
exports.newOrder = catchAsyncErrors(async(req, res, next)=>{
    const{
        Items,
        envioInfo,
        precioItems,
        precioImpuesto,
        precioEnvio,
        precioTotal,
        pagoInfo
    } = req.body;

    const order = await Order.create({
        Items,
        envioInfo,
        precioItems,
        precioImpuesto,
        precioEnvio,
        precioTotal,
        pagoInfo,
        fechaPago: Date.now(),
        user: req.user._id
    })
    res.status(201).json({
        success: true,
        order
    })
})

//ver una orden
exports.getOneOrder = catchAsyncErrors(async(req, res, next)=>{
    //restriccion de usuario
    const order = await Order.findById(req.params.id).populate('user','nombre email')

    if(!order){
        return next (new ErrorHandler('No encontrammos una orden con ese ID',404))
    }
    res.status(200).json({
        success: true,
        order
    })
})

//ver todas las ordenes (usuario logueado)
exports.myOrders = catchAsyncErrors(async(req, res, next)=>{
    const orders = await Order.find({user: req.user.id});

    res.status(200).json({
        success: true,
        orders
    })
})

//Administrador
//Ver todas las ordenes (administardor)
exports.allOrders = catchAsyncErrors(async(req, res, next)=>{
    const orders = await Order.find()

        let cantidadTotal =0;
        orders.forEach(order=>{
            cantidadTotal = cantidadTotal + order.precioTotal
            //cantidadTotal += order.precioTotal
        })
        
        res.status(200).json({
            success: true,
            cantidadTotal,
            orders
        })
})

//Editar ordenes por administrador
exports.updateOrder = catchAsyncErrors(async(req, res, next)=>{
    const order = await Order.findById(req.params.id)

    if(!order){
        return next (new ErrorHandler('Orden no encontrada', 404))
    }

    if (order.estado === 'Enviado'){
        return next (new ErrorHandler('esta orden ya se proceso', 400))
    }

    order.estado = req.body.estado;
    order.fechaEnvio = Date.now();

    await order.save()

    res.status(200).json({
        success:true,
        order
    })
})

//eliminar una orden por administrador
exports.deleteOrder = catchAsyncErrors(async(req, res, next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next (new ErrorHandler('Esta orden no esta registrada', 404))
    }

    await order.remove()

    res.status(200).json({
        success: true,
        message: 'Orden eliminada correctamente.'
    })
})









//actualizar stock de inventario
async function updateStock (id, quantity){
    const product = await Product.findById(id);
    product.inventario = product.inventario-quantity;
    await product.save({validateBeforeSave:false})
}

