const User=require('../models/user')
const BigPromise=require('../middlewares/bigPromise')
const CustomError=require('../utils/customError')
const cookieToken = require('../utils/cookieToken')
const cloudinary=require('cloudinary')


exports.signup=BigPromise(async(req,res,next)=>{

    let result;
    // console.log(req.body.email)

    if(!req.files){
        return next(new CustomError("Plz upload the profile image of the user",400))
    }

    const {name,email,password}=req.body

    if(!email || !name || !password){
        // return next(new CustomError('Plz Send Email',400))
        return next(new Error("Name ,email and password are required"))
    }


    if(req.files){
        let file=req.files.photo
        // console.log("fbhbfhbb")
        console.log(file)
        result=await cloudinary.uploader.upload(file.tempFilePath,{
            folder:"user1"
        })

        console.log(result)
    }

    
   

    const user=await User.create({
        name,
        email,
        password,
        photo:{
            id:result.public_id,
            secure_url:result.secure_url
        }
    })

    //method to generte a cookie with the token generated with the expiry date ...........................

    cookieToken(user,res)
    
})

exports.login=BigPromise(async(req,res,next)=>{

    const {email,password}=req.body;

    //check for email and password
    if(!email||!password)
    {
        return next(new CustomError('please provide the email and password',400));
    }

    const user=await User.findOne({email}).select("+password")                      // We have mentioned the select field as false in the User Schema so we want to return it explicitly.....

    if(!user){
        return next(new CustomError('you are not registerd in the database',400));
    }

    const isPasswordCorrect=await user.isValidatedPassword(password)
    if(!isPasswordCorrect){
        return next(new CustomError('Password entered is wrong',400));
    }

    cookieToken(user,res)


})

exports.logout=BigPromise(async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    });

    res.status(200).json({
        success:true,
        message:"Logout Successfully"
    })
})



exports.getLoggedInUserDetails=BigPromise(async(req,res,next)=>{

    const user=await User.findById(req.user.id)              // req.user is the property crated in the middleware user.js

    res.status(200).json({
        success:true,
        user,
    })
})


exports.updateUserDetails=BigPromise(async(req,res,next)=>{

    const newData={
        name:req.body.name,
        email:req.body.email
    }

    if(req.files){

        const user= await User.findById(req.user.id)

        const imageId=user.photo.id

        const resp=await cloudinary.v2.uploader.destroy(imageId)             // deleting the image from the cloudinary

        //upload the new photo
        const result=await cloudinary.uploader.upload(req.files.photo.tempFilePath,{
            folder:"user1"
        })

        newData.photo={
            id:result.public_id,
            secure_url:result.secure_url
        }


    }
    const user=await User.findByIdAndUpdate(req.user.id,newData)

    res.status(200).json({
        success:true,
        user
    })

    
})

exports.deleteUser=BigPromise(async(req,res,next)=>{

    const user=await User.findByIdAndDelete(req.user.id)

    res.status(200).json({
        message:"User Deleted Successfully"
    })
})
