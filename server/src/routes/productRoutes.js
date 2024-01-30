const express = require('express')
const {addProducts}= require('../controllers/products')
router=express.Router()

//routes for creating new user
router.post('/products', addProducts)



module.exports= router