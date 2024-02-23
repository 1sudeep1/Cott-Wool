const express = require('express')
const {registerNewUser, getAllUsers, getUserPhonePassword, updateById, deleteById, userLogin, changePassword, getUserProfilePic}= require('../controllers/users')
router=express.Router()
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/profilePic')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

//test is a middleware first test will call after that registerNewUser will call

//routes for creating new user multer
router.post('/register', upload.single('profile'), registerNewUser)

//router for getting user profile pic
router.get('/profile/:id', getUserProfilePic)

//routes for getting all users
router.get('/users', getAllUsers)

//routes for getting user by id
router.post('/login', getUserPhonePassword)


//routes for updating id
router.put('/users/:id', updateById)

//routes for deleting details with id
router.delete('/users/:id', deleteById)

//routes for changing password
router.post('/change-password', changePassword)

module.exports= router