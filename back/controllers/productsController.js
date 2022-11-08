const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const producto=require("../models/productos");
const ErrorHandler = require("../utils/errorHandler");

//fetch usurpacion del required
const fetch = (url) => import ('node-fetch').then(({default:fetch})=>fetch(url));

//ver la lista de productos
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    const productos=await producto.find();
    if (!productos){
        return next(new ErrorHandler("Informacion no encontrada",404))
     }
    res.status(200).json({
        success:true,
        cantidad:productos.length,
        productos
    })
})

//ver producto por id
exports.getProductById= catchAsyncErrors(async(req,res,next)=> {
     const product=await producto.findById(req.params.id)
     if (!product){
        return next(new ErrorHandler("Producto no encontrado",404))
     }
     res.status(200).json({
        success:true,
        mensaje: "Aqui abajo encontrara la informacion del producto",
        product
     })
})

//crear nuevo producto/api/productos
exports.newProduct= catchAsyncErrors( async(req,res,next) => {
  const product=await producto.create(req.body);
  res.status(201).json({
    success:true,
    product
  })
})

//Update un producto
exports.updateProduct= catchAsyncErrors( async(req,res,next)=> {
    let product=await producto.findById(req.params.id)
    if (!product){
        return next(new ErrorHandler("Producto no encontrado",404))
     }
     product=await producto.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
     });
     res.status(200).json({
        success:true,
        message:"Producto actualizado correctamente!",
        product
     })
})

//eliminar un producto
exports.deleteProduct= catchAsyncErrors( async(req,res,next)=> {
    const product=await producto.findById(req.params.id)
    if (!product){
        return next(new ErrorHandler("Producto no encontrado",404))
     }
     await product.remove();
     res.status(200).json({
        success:true,
        message:"Producto eliminado correctamente!.",
     })
})

//fetch metodo para consultas en consola

function verProductos(){
    fetch('http://localhost:4000/api/productos')
    .then(res=>res.json())
    .then(res=>console.log(res))
    .catch(err=>console.error(err))
}
//verProductos(); llamamos al metodo para probar consulta por consola de los productos de la db.

function verProductoPorId(id){
    fetch('http://localhost:4000/api/producto/'+id)
    .then(res=>res.json())
    .then(res=>console.log(res))
    .catch(err=>console.error(err))
}
//verProductoPorId('636219cab0edaf38b6326ec7');