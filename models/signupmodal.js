const mongoose = require("mongoose")
const signupschema = mongoose.Schema({
  
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    confirm_password :{type: String, required :true}


}, { versionKey: false })


const signupmodel = mongoose.model("signup", signupschema)
module.exports =  signupmodel