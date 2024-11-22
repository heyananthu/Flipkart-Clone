const mongoose = require('../Mangoose')

const newUser = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },

    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

const newUserDetails = mongoose.model("Registration",newUser)

module.exports = newUserDetails
