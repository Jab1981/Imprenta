const mongoose = require ('mongoose')
const validator = require ('validator')
const bcryp = require ('bcryptjs')
const jwt = require ('jsonwebtoken')
const crypto = require('crypto')

const usuarioSchema = new mongoose.Schema ({
    nombre:{
        type:String,
        required:[true, "Por favor ingrese un Nombre"],
        maxlength:[120, "El nombre no puede exceder los 120 caracteres"]
    },
    email:{
        type:String,
        required:[120, "Por fvoringrese el correo electronico"],
        unique:true,
        validate:[validator.isEmail, "Por favor ingrese un email valido"]
    },
    password:{
        type:String,
        required:[true, "Por favor registre una contraseña"],
        minlength:[8, "La contraseña no debe tenermenos de8 caracteres"],
        select:false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role:{
        type:String,
        default:'user'
    },
    fechaRegistro:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
  
})

usuarioSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcryp.hash(this.password,10)
})

usuarioSchema.methods.compararPass = async function (passDada){
    return await bcryp.compare(passDada,this.password)
}
// retorno JWT token
usuarioSchema.methods.getJwtToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_TIEMPO_EXPIRACION
    })
}
//Generar token reset password
usuarioSchema.methods.genResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString('hex')

    //hashear y setear resetToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    //setear fecha de expiracion del token//30 min
    this.resetPasswordExpire = Date.now()+30*60*1000
    
    return resetToken
}


module.exports = mongoose.model('auth',usuarioSchema)