const express = require('express')
const {addCart, clearCart, removeCartById, cartItemsByUserId}= require('../controllers/cart')
router=express.Router()

//routes for creating new products
router.post('/cart', addCart)

//routes for clearing cart
router.delete('/cart/:uId', clearCart)

//routes for deleting cart product by id
router.delete('/carts/:id', removeCartById)

//routes for fetching cart by userId
router.get('/cart/:userId', cartItemsByUserId)


module.exports= router