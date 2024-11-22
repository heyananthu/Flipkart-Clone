const mongoose = require('../Mangoose')

const newProduct = new mongoose.Schema({
    name:{
        type : String,
        require:true
    },
    description:{
        type : String,
        require:true
    },
    price:{
        type: String,
        require:true
    },
    img:{
        type:String,
        require:true
    }

})
const newProductCollection = mongoose.model('Products',newProduct)

module.exports = newProductCollection;