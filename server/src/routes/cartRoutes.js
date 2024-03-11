const express = require('express')
const {addCart, clearCart, removeCartById}= require('../controllers/cart')
router=express.Router()

//routes for creating new products
router.post('/cart', addCart)

//routes for clearing cart
router.delete('/cart', clearCart)

//routes for deleting cart product by id
router.delete('/cart/:id', removeCartById)


module.exports= router