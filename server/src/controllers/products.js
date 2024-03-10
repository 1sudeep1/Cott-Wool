//importing the model
const Products = require('../models/productModel')

//importing jwt
const jwt = require('jsonwebtoken');


const addProducts = async (req, res) => {
    try {
        if(req.file){
            req.body.productImage=req.file.filename;
          }
       
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


const getProductsById= async(req, res)=>{
    try{
        const productById= await Products.findById(req.params.id)
        res.json({msg:'single products fetched successfully', productById})

    }catch(err){
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

const capitalizeFirsLetter=(str)=>{
    return str.toLowerCase().split(' ').map((word)=>word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}


const getProductByCategory= async(req, res)=>{
    try{
        const productByCategory= await Products.find({productCategory:capitalizeFirsLetter(req.params.category)})
        if(productByCategory){
            res.json({productByCategory})
        }
    }catch(err){
        console.log(err)
    }
}

const getProductBySubCategory= async(req, res)=>{
    try{
        const productBySubCategory= await Products.find({productSubCategory:req.params.subCategory})
        if(productBySubCategory){
            res.json({productBySubCategory})
        }
    }catch(err){
        console.log(err)
    }
}

const searchProducts= async(req, res)=>{
    try{
        const searchTerm = req.query.item;
        const searchResult = await Products.find({ 
            $or: [
                { productName: { $regex: new RegExp(searchTerm, 'i') } },
                { productImage: { $regex: new RegExp(searchTerm, 'i') } },
                { productDescription: { $regex: new RegExp(searchTerm, 'i') } },
                { productCategory: { $regex: new RegExp(searchTerm, 'i') } },
                { productSubCategory: { $regex: new RegExp(searchTerm, 'i') } },
            ]
        });
        if(searchResult.length>0){
            res.json(searchResult)
        }else{
            res.json('Sorry!!  No items found...')
        }
    }catch(err){
        console.log(err)
    }
}







module.exports = { addProducts, getAllProducts, getProductsById, deleteProduct, getProductByCategory, getProductBySubCategory, searchProducts }