import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'

// Data to seed
import users from './data/users.js'
import products from './data/products.js'

// DB models
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'

// Connecting to database
import connectDB from './config/db.js'

dotenv.config()

connectDB()

// importing data
const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (err) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

// destroying data
const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data destroyed!'.red.inverse)
    process.exit()
  } catch (err) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if(process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}