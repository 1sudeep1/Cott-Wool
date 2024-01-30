const express = require('express')
const {registerNewUser, getAllUsers, getUserPhonePassword, updateById, deleteById, userLogin, changePassword}= require('../controllers/users')
router=express.Router()

//routes for creating new user
router.post('/register', registerNewUser)

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