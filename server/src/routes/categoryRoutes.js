const express = require('express')
const {addCategory, getCategory}= require('../controllers/category')
router=express.Router()

//routes for creating new user
router.post('/category', addCategory)

//routes for fetching category
router.get('/category', getCategory)



module.exports= router