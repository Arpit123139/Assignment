const mongoose =require('mongoose')


const bookSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    number:{
        type:String,
        default:1
    }

})

module.exports=mongoose.model('Book',bookSchema)


