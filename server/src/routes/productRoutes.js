const express = require('express')
const {addProducts, getAllProducts, deleteProduct, getProductsById, getProductByCategory, getProductBySubCategory, searchProducts}= require('../controllers/products')
router=express.Router()
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/products')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

//routes for creating new products
router.post('/products', upload.single('productImage'), addProducts)

//routes for fetching all products
router.get('/products', getAllProducts)

//routes for fetching single product details by id
router.get('/product-details/:id', getProductsById)

//routes for deleting product
router.delete('/products/:id', deleteProduct)

//routes for products according to category
router.get('/category-products/:category', getProductByCategory)

//routes for products according to subCategory
router.get('/subcategory-products/:subCategory', getProductBySubCategory)

//routes for search product
router.get('/search', searchProducts)



module.exports= router