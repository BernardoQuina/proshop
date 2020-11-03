import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import productRoute from './routes/productRoutes.js'

dotenv.config()

connectDB()

const app = express()

// DEV logging middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}


app.get('/', (req, res) => {
  res.send('API is running...')
})

// Mount routers
app.use('/api/products', productRoute)


// Error middleware
app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold))