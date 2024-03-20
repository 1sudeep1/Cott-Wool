//importing the model
const WishList = require('../models/wishListModel')

//importing jwt
const jwt = require('jsonwebtoken');

const addWishList = async (req, res) => {
    try {
        const {wishListItems, userId}=req.body
        for(const item of wishListItems){
            item.userId=userId
            const existingItem= await WishList.findById(item._id)
            if(!existingItem){
                await WishList.create(wishListItems)
            }
        }
        res.json({ message: 'Wishlist updated successfully' });
    } catch (err) {
        console.log(err);
    }
}

const clearWishList=async(req, res)=>{
    try{
        await WishList.deleteMany({ userId: req.params.uId })
        res.json({msg:"WishList cleared successfully", check:true})

    }catch(err){
        console.log(err)
        res.json({msg:"cart not cleared", check:false})
    }
}

const removeWishListById= async(req, res)=>{
    try {
        const removeWishListItem = await WishList.findByIdAndDelete(req.params.id)
        if (removeWishListItem) {
          res.json({ msg: 'wishlist item successfully deleted', check:true })
        }
      } catch (err) {
        console.log(err)
      }
}

const wishListItemsByUserId= async(req, res)=>{
    try{
        const getwishListItemsByUserId= await WishList.find({userId:req.params.userId})
        if(getwishListItemsByUserId){
            res.json({getwishListItemsByUserId})
        }
    }catch(err){

        console.log(err)
    }
}


module.exports = { addWishList, clearWishList, removeWishListById, wishListItemsByUserId }