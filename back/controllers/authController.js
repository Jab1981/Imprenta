const User = require('../models/auth')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const tokenEnviado = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail')
const crypto = require ('crypto');
const { param } = require('../routes/auth');


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

//cerrar sesion (logout)

exports.logOut = catchAsyncErrors(async(req, res, next)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:'Cerró Sesión'
    })
})

//Olvide contraseña,recuperar contrseña
exports.forgotPassword = catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next (new ErrorHandler ('Usuario no se encuentra registrado',404))
    }
    const resetToken = user.genResetPasswordToken();
    await user.save({validateBeforeSave:false})

    //Url para reset de contraseña
    const resetUrl =`${req.protocol}://${req.get('host')}/api/resetPassword/${resetToken}`;

    const mensaje = `Tu link para una nueva contraseña es el siguiente: \n\n ${resetUrl}\n\n
    Si no solicitste este link, por 
    favor comunicate con soporte\n\n Att:\nLitografia Pulgarin`
    
    try{
        await sendEmail({
            email: user.email,
            subject:"Pulgarin Recuperación de la contraseña",
            mensaje
        })
        res.status(200).json({
            success: true,
            message: `Correo enviado a:${user.email}`
        })
     }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false});
        return next (new ErrorHandler(error.message,500))
     }
})

//Reset contraseña
exports.resetPassword = catchAsyncErrors(async(req, res, next) =>{
    //hash token que llega de url
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    //Buscar usuario al que se resetea lacontraseña
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    }) 
    //El usuario si existe en la base de datos?
    if(!user){
        return next (new ErrorHandler('El token es invalido o ya expiro',400))
    }
    //Digilenciamiento de los campos
    if(req.body.password !== req.body.confirmPassword){
        return next (new ErrorHandler('Contraseñas no coinciden',400))
    }
    //Setear la nueva contraseña
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    tokenEnviado(user, 200, res)

})

// ver perfil de usuario en logeo
exports.getUserProfile = catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
        success:true,
        user
    })
})

//Update contraseña con usuario logeado
exports.updatePassword = catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findById(req.user.id).select('+password');

    //revision de contraseña anterior con la nueva 
    const sonIguales = await user.compararPass(req.body.oldPassword)

    if(!sonIguales){
        return next(new ErrorHandler('La contraseña anterior no es correcta'))
    }

    user.password = req.body.newPassword;
    await user.save();

    tokenEnviado(user, 200, res)
})

//Update perfil (usuario logeado)
exports.updateProfile = catchAsyncErrors(async(req, res, next)=>{
    const newUserData ={
        nombre: req.body.nombre,
        email: req.body.email
    }
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
       new: true,
       runValidators:true,
       useFindAndModify:false 
    })
    res.status(200).json({
        success:true,
        user
    })
})

//Servicios controladoressobre los ususarios por parte de administrador
//Ver todos los usuarios
exports.getAllUsers = catchAsyncErrors(async(req, res, next)=>{
    const users = await User.find();

    res.status(200).json({
        success:true,
        users
    })
})

//ver el detalle de 1 usuario
exports.getUserDetails = catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next (new ErrorHandler(`No se ha encontrado el usuario con el id: ${req.params.id}`))
    }

    res.status(200).json({
        success:true,
        user
    })
})

//actualizar perfil de usuario (como administrador)
exports.updateUser = catchAsyncErrors(async(req, res, next)=>{
    const nuevaData = {
        nombre: req.body.nombre,
        email: req.body.email,
        role: req.body.rol
    }
    const user = await User.findByIdAndUpdate(req.params.id, nuevaData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        user
    })
})

//eliminar usuario (admin)
exports.deleteUser = catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findById(req.params.id);
    
    if(!user){
        return next (new ErrorHandler(`Usuario con id: ${req.params.id} no se encuentra en la base de datos`))
    }

    await user.remove()

    res.status(200).json({
        success:true,
        message: 'Usuario eliminado correctamente'
    })
})