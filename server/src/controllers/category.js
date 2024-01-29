//importing the model
const Category = require('../models/categoryModel')

//importing jwt
const jwt = require('jsonwebtoken');


const addCategory = async (req, res) => {
    try {
        await Category.create(req.body)
        res.json({ msg: 'category added successfully' })

    } catch (err) {
        console.log(err)
    }
}

//routes functions for getting all users and server side pagination
const getCategory = async (req, res) => {
    try {
      const allCategory = await Category.find();
      res.json({ msg: "all users are fetched", allCategory})
  
    } catch (err) {
      console.log(err)
    }
  }

module.exports = { addCategory, getCategory }