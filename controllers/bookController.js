const Book=require('../models/book')
const BigPromise=require('../middlewares/bigPromise')


exports.findBook=BigPromise(async(req,res)=>{

    // console.log("Name "+name)
    const {name}=req.body
    
    const book=await Book.findOne({name})
    // console.log(book)
    if(!book){
        return res.status(404).json({
            message:"Book Does not exsist"
        })
    }
    res.status(200).json({
        message:"Book Exsist"
    })
})


exports.addBook=BigPromise(async(req,res)=>{
    // console.log("Name "+name)
    const {name}=req.body
    console.log("Name "+name)

    const book=await Book.create({name})

    res.status(200).json(book)
})