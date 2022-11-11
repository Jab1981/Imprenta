const User = require('../models/auth')
const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

//verificacion de autenticacion
exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next)=>{
    const {token} = req.cookies
    
    if(!token){
        return next(new ErrorHandler("Debe iniciar sesion para acceder a este recurso"),401)
    }
    
    const decodificada = jwt.decode(token, process.env.JWT_SECRET)
    req.user = await User.findById(decodificada.id);

    next()

})