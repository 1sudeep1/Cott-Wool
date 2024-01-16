//importing the model
const User = require('../models/user')

//routes function for registering new users
const registerNewUser = async(req, res) => {
  console.log(req.body)
  try {
    const existingNumber = await User.findOne({ phone: req.body.phone });
    if (existingNumber) {
      return res.status(403).json({ msg: 'user already exist' })
    } else {
      await User.create(req.body)
      res.send({ msg: 'user registered successfully' })
    }
  } catch (err) {
    console.log(err)
  }
}

//routes functions for getting all users
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.send(allUsers);
    res.json({ msg: "all users are fetched" })

  } catch (err) {
    console.log(err)
  }
}

//function for getting details by id
const getUserById = async (req, res) => {
  try {
    const userById = await User.findById(req.params.id)
    res.send(userById)
    res.json({ msg: "details with particular id are fetched" })
  } catch (err) {
    console.log(err)
  }
}

//function for updating details by id
const updateById = async (req, res) => {
  try {
    const userById = await User.findByIdAndUpdate(req.params.id, req.body)
    res.send(userById)
    res.json({ msg: "details with particular id are updated" })
  } catch (err) {
    console.log(err)
  }
}

const deleteById = async (req, res) => {
  try {
    const deleteData = await User.findByIdAndDelete(req.params.id)
    if (deleteData) {
      res.json({ msg: 'successfully deleted' })
    }
  } catch (err) {
    console.log(err)
  }
}

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    await User.findOne({ email: email }).then(User => {
      if (User) {
        if (User.password === password) {
          res.json({ msg: 'success' })
        } else {
          res.json({ msg: 'incorrect password' })
        }
      } else {
        res.json({ msg: 'no data found' })
      }
    })
    if (result) {
      res.json({ msg: 'data found' })
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = { registerNewUser, getAllUsers, getUserById, updateById, deleteById, userLogin }