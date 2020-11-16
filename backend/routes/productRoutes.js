import express from 'express'
import { protect, isAdmin } from '../middleware/authMiddleware.js'
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts
} from '../controllers/productController.js'

const router = express.Router()


router
  .route('/')
    .get(getProducts)
    .post(protect, isAdmin, createProduct)

router
  .route('/top')
    .get(getTopProducts)

router
  .route('/:id/reviews')
    .post(protect, createProductReview)

router
  .route('/:id')
    .get(getProductById)
    .delete(protect, isAdmin, deleteProduct)
    .put(protect, isAdmin, updateProduct)




export default router