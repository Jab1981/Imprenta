const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res, next) =>{
    err.statusCode= err.statusCode || 500;
    err.message= err.message || "Internal Server Error"

    res.status(err.statusCode).json({
        success:false,
        message: err.stack
    })

//error de clave duplicada en mongoose
if (err.code === 11000){
    const message = `Clave duplicada ${Object.keys(err.keyValue)}`
    error = new ErrorHandler(message,400)
    }

//error en JWT
if (err.name === "JsonWebTokenError"){
    const message = "Token de Json es invalido, intente de nuevo!"
    error = new ErrorHandler(message,400)
   }
//JWT token expirado
if (err.name === "TokenExpiredError"){
    const message = "Token de Json es vencido, intente de nuevo!"
    error = new ErrorHandler(message,400)
   }

}