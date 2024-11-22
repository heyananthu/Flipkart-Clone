const mongoose = require('mongoose');

mongoose.connect("mongodb://0.0.0.0:27017/Flipkart",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connection Successfull")
}).catch((err)=>{
    console.log("Connection Failed")
})

module.exports= mongoose;