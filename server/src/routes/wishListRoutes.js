const express = require('express')
const {addWishList, clearWishList, removeWishListById}= require('../controllers/wishList')
router=express.Router()

//routes for creating new products
router.post('/wishlist', addWishList)

//routes for clearing wishlist
router.delete('/wishlist', clearWishList)

//routes for deleting wishlist product by id
router.delete('/wishlist/:id', removeWishListById)


module.exports= router