const express = require('express')
const {addCategory, getCategory, getSubCategory}= require('../controllers/category')
router=express.Router()

//routes for creating new user
router.post('/category', addCategory)

//routes for fetching category
router.get('/category', getCategory)

//routes for fetching subcategory on the basic of category
router.get('/sub-category/:cat', getSubCategory)



module.exports= router