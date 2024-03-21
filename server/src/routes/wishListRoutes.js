const express = require('express')
const {addWishList, clearWishList, removeWishListById, wishListItemsByUserId, wishListItemsByUserIdCounter}= require('../controllers/wishList')
router=express.Router()

//routes for creating new products
router.post('/wishlist', addWishList)

//routes for clearing wishlist
router.delete('/wishlists/:uId', clearWishList)

//routes for deleting wishlist product by id
router.delete('/wishlist/:id', removeWishListById)

//routes for fetching wishlist by userId to dispay items in wishlist page
router.get('/wishlist/:userId', wishListItemsByUserId)

//routes for fetching wishlist by userId for counter in navbar
router.get('/wishlists/:userId', wishListItemsByUserIdCounter)


module.exports= router