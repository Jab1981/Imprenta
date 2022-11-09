const mongoose = require ('mongoose')
const validator = require ('validator')
const bcryp = require ('bcryptjs')

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
module.exports = mongoose.model('auth',usuarioSchema)