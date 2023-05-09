const express=require('express')
const router=express.Router()
const {signup,login,logout,updateUserDetails, deleteUser}=require('../controllers/userController')
const { isLoggedIn } = require('../middlewares/user')


router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/userdashboard/update').post(isLoggedIn,updateUserDetails)
router.route('/delete').get(isLoggedIn,deleteUser)



module.exports=router;