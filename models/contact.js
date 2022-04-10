
const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
    name : {
        type:String ,
        required : true
    },
    phone: {
        type : String ,
        required : true 
    }, 

    email : {
        type:String
    },

    address: {
        type : String ,
    },
} , {timestamps : true}) 
const Contact = mongoose.model("Contact", contactSchema);
module.exports= Contact;