//importing the model
const Cart = require('../models/cartModel')

//importing jwt
const jwt = require('jsonwebtoken');

const addCart = async (req, res) => {
    try {
        const { cartItems, userId } = req.body;

        for (const item of cartItems) {
            item.userId=userId
            const existingItem = await Cart.findByIdAndUpdate(item._id, {
                quantity: item.quantity,
                totalPrice: item.totalPrice
            }, { new: true }); // Setting { new: true } returns the updated document

            if (!existingItem) {
                // If the item does not exist, create a new entry in the cart
                await Cart.create(item);
            }
        }

        res.json({ message: 'Cart updated successfully' });
    } catch (err) {
        console.log(err);
    }
}

const clearCart=async(req, res)=>{
    try{
        await Cart.deleteMany({ userId: req.params.uId });
        res.json({msg:"cart cleared successfully", check:true})

    }catch(err){
        console.log(err)
        res.json({msg:"cart not cleared", check:false})
    }
}

const removeCartById= async(req, res)=>{
    try {
        const removeCartItem = await Cart.findByIdAndDelete(req.params.id)
        if (removeCartItem) {
          res.json({ msg: 'cart item successfully deleted', check:true })
        }
      } catch (err) {
        console.log(err)
      }
}

//cart controllers to fetch items to display items in page
const cartItemsByUserId= async(req, res)=>{
    try{
        const count= await Cart.find().count();
        const skipCount=(req.query.page-1)*5
        const getCartItemsByUserId= await Cart.find({userId:req.params.userId}).limit(5).skip(skipCount)
        if(getCartItemsByUserId){
            res.json({getCartItemsByUserId, count})
        }
    }catch(err){

        console.log(err)
    }
}

//cart controllers to fetch items for counter
const cartItemsByUserIdCounter= async(req, res)=>{
    try{
        const getCartItemsByUserIdCounter= await Cart.find({userId:req.params.userId})
        if(getCartItemsByUserIdCounter){
            res.json({getCartItemsByUserIdCounter})
        }
    }catch(err){

        console.log(err)
    }
}


module.exports = { addCart, clearCart, removeCartById, cartItemsByUserId, cartItemsByUserIdCounter }