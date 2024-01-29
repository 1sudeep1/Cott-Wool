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



module.exports = { addProducts }