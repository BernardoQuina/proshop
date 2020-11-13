import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

// Body parser middleware
app.use(express.json())

// DEV logging middleware
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}


app.get('/', (req, res) => {
  res.send('API is running...')
})

// Mount routers
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

// PayPal config route
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// make uploads a static folder for the browser
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


// Error middleware
app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold))