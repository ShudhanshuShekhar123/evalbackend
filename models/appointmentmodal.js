const mongoose = require("mongoose")
const appointschema = mongoose.Schema({
  
    
        name: { type: String },
        image: { type: String },
        specialization: { type: String },
        experience: { type: Number },
        location: { type: String },
        date: { type: String },
        slots: { type: Number },
        fee: { type: Number }
    


}, { versionKey: false })


const appointmentmodal = mongoose.model("appointment", appointschema)
module.exports = appointmentmodal