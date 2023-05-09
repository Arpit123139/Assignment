const express=require('express')
const app=express();
require('dotenv').config()
const cookieParser=require('cookie-parser')
const fileUpload=require('express-fileupload')
const cloudinary=require('cloudinary')


const connectWithDb=require('./config/db')

connectWithDb()
cloudinary.config({
    cloud_name:"dsojdaybz",
    api_key:"652284453546932",
    api_secret:"GlC9HSJ-qW_5tuh8xSzU0dkjilo"
})

//reguglar miidelware
app.use(express.json())                             // To handle the json
app.use(express.urlencoded({extended:true}))        //to handle something comming in the body

//cookies and file Middleware
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}));
//for ejs file
app.set('view engine','ejs')

app.listen(process.env.PORT,()=>{
    console.log(`Listening on port ${process.env.PORT}`)
})



const user=require('./routes/user')
const book=require('./routes/book')
app.use("/api/v1",user)
app.use("/api/v1",book)

app.get('/signup',(req,res)=>{
    res.render('signuptest')
})
app.get('/login',(req,res)=>{
    res.render('signintest')
})
app.get('/update',(req,res)=>{
    res.render('updatetest')
})
app.get('/findbook',(req,res)=>{
    res.render('bookfind')
})
app.get('/addbook',(req,res)=>{
    res.render('addbook')
})




