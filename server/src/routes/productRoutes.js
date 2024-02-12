const express = require('express')
const {addProducts, getAllProducts, deleteProduct, getProductsById}= require('../controllers/products')
router=express.Router()

//routes for creating new products
router.post('/products', addProducts)

//routes for fetching all products
router.get('/products', getAllProducts)

//routes for fetching single product details by id
router.get('/product-details/:id', getProductsById)

//routes for deleting product
router.delete('/products/:id', deleteProduct)



module.exports= router