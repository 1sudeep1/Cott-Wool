
const express = require('express')
const {addCart, clearCart, removeCartById, cartItemsByUserId, cartItemsByUserIdCounter}= require('../controllers/cart')
router=express.Router()

//routes for creating new products
router.post('/cart', addCart)

//routes for clearing cart
router.delete('/carts/:uId', clearCart)

//routes for deleting cart product by id
router.delete('/cart/:id', removeCartById)

//routes for fetching cart by userId to display items in cart page
router.get('/cart/:userId', cartItemsByUserId)

//routes for fetching cart by userId for counter in header
router.get('/carts/:userId', cartItemsByUserIdCounter)


module.exports= router
