exports.getProducts = (req, res, next) => {
    res.status(200).json({
        success:true,
        message:"En esta ruta podra ver todos los productos"
    })
}


