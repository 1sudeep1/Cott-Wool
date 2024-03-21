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
        const count= await WishList.find().count();
        const skipCount=(req.query.page-1)*5
        const getwishListItemsByUserId= await WishList.find({userId:req.params.userId}).limit(5).skip(skipCount)
        if(getwishListItemsByUserId){
            res.json({getwishListItemsByUserId, count})
        }
    }catch(err){

        console.log(err)
    }
}

//wishlist controllers for counter
const wishListItemsByUserIdCounter= async(req, res)=>{
    try{
        const getwishListItemsByUserIdCounter= await WishList.find({userId:req.params.userId})
        if(getwishListItemsByUserIdCounter){
            res.json({getwishListItemsByUserIdCounter})
        }
    }catch(err){

        console.log(err)
    }
}


module.exports = { addWishList, clearWishList, removeWishListById, wishListItemsByUserId, wishListItemsByUserIdCounter }