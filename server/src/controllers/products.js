//importing the model
const Products = require('../models/productModel')

//importing jwt
const jwt = require('jsonwebtoken');


const addProducts = async (req, res) => {
    try {
        await Products.create(req.body)
        res.status(200).json({ msg: 'Product added successfully' })

    } catch (err) {
        console.log(err)
    }
}

const getAllProducts = async (req, res) => {
    try {
        const allProducts=await Products.find()
        res.json({msg: 'products fetched successfully', allProducts})

    } catch (err) {
        console.log(err)
    }
}


const deleteProduct = async (req, res) => {
    try {
        const deleteProductData=await Products.findByIdAndDelete(req.params.id)
        if (deleteProductData) {
            res.json({ msg: 'product deleted successfully.' })
          }else{
            res.json({ msg: 'product deletion failed' })
          }

    } catch (err) {
        console.log(err)
    }
}







module.exports = { addProducts, getAllProducts, deleteProduct }