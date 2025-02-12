import express from 'express'
const router = express.Router()

import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  UpdateOrderToPaid,
  getOrders,
  UpdateOrderToDelivered
} from '../controllers/orderController.js'

import { protect, isAdmin } from '../middleware/authMiddleware.js'


router
  .route('/')
    .post(protect, addOrderItems)
    .get(protect, isAdmin, getOrders)

router
  .route('/myorders')
    .get(protect, getMyOrders)

router
  .route('/:id')
    .get(protect, getOrderById)

router
  .route('/:id/pay')
    .put(protect, UpdateOrderToPaid)

router
  .route('/:id/deliver')
    .put(protect, isAdmin, UpdateOrderToDelivered)




export default router