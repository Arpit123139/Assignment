const express=require('express')
const { addBook, findBook } = require('../controllers/bookController')
const router=express.Router()


router.route("/addbook").post(addBook)
router.route("/findbook").post(findBook)

module.exports=router