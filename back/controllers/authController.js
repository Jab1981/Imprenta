const User = require('../models/auth')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const tokenEnviado = require('../utils/jwtToken');

//registro de nuevo usuario
exports.registroUsuario= catchAsyncErrors(async (req, res, next) =>{
    const {nombre, email, password} = req.body;

    const user = await User.create({
        nombre,
        email,
        password,
        avatar:{
            public_id:"ANd9GcQKZwmqodcPdQUDRt6E5cPERZDWaqy6ITohlQ&usqp",
            url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKZwmqodcPdQUDRt6E5cPERZDWaqy6ITohlQ&usqp=CAU"
        }
    })
    tokenEnviado (user,201,res)
    
})

//Iniciar sesión

exports.loginUser = catchAsyncErrors(async(req, res, next)=>{
    const {email, password} = req.body;
    //validar datos de ingreso
    if (!email || !password){
        return next(new ErrorHandler("Por favor Ingrese email y contraseña",401))
    }
    //Buscar al usuario
    const user = await User.findOne({email}).select("+password")
    if (!user){
        return next (new ErrorHandler("Email o contraseña invalidos",401))
    }
    //Comparar contraseña 
    const contrasenaOK = await user.compararPass(password);
    if (!contrasenaOK){
        return next(new ErrorHandler("Contraseña invalida",401))
    }
    tokenEnviado (user,200,res)
 
})
