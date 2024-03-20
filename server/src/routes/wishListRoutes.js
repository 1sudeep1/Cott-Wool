const express = require('express')
const {addWishList, clearWishList, removeWishListById, wishListItemsByUserId}= require('../controllers/wishList')
router=express.Router()

//routes for creating new products
router.post('/wishlist', addWishList)

//routes for clearing wishlist
router.delete('/wishlists/:uId', clearWishList)

//routes for deleting wishlist product by id
router.delete('/wishlist/:id', removeWishListById)

//routes for fetching wishlist by userId
router.get('/wishlist/:userId', wishListItemsByUserId)


module.exports= router