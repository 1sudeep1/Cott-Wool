const express = require('express')
const {registerNewUser, getAllUsers, getUserById, updateById, deleteById, userLogin}= require('../controllers/users')
router=express.Router()

//routes for creating new user
router.post('/register', registerNewUser)

//routes for getting all users
router.get('/users', getAllUsers)

//routes for getting user by id
router.get('/users/:id', getUserById)

//routes for updating id
router.put('/users/:id', updateById)

//routes for deleting details with id
router.delete('/users/:id', deleteById)

//routes for user login
router.post('/login', userLogin)
module.exports= router