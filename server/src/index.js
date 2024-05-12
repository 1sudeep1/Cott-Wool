const express = require('express')
const cors= require('cors')
const app = express()
//using the external .env in the project
require('dotenv').config()
const port = process.env.PORT

//importing the route that is defined in routes/users
const userRoute=require('./routes/users')
const categoryRoute=require('./routes/categoryRoutes')
const productRoute=require('./routes/productRoutes')
const cartRoute= require('./routes/cartRoutes')
const wishListRoute= require('./routes/wishListRoutes')


//importing the db connection
const connection=require('./db/connection')

// to parse req.body to plain object/json
app.use(express.json())

//it make the uploads folder public. so that we can directly access it by url http://localhost:5000/uploads/profilePic/default.jpg
app.use('/uploads',express.static('uploads'))

//The CORS Policy Enables Cross-origin resource sharing (CORS) in Express Gateway. CORS defines a way in which a browser and server can interact and determine whether or not it is safe to allow a cross-origin request.
app.use(cors())

//calling the connection
connection()

//using the route
app.use(userRoute)
app.use(categoryRoute)
app.use(productRoute)
app.use(cartRoute)
app.use(wishListRoute)






//listening the port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})