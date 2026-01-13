import express from 'express';
import {
  createOrder,
  getActiveOrders,
  getDeliveredOrders,
  getUserOrders,
  markOrderDelivered
} from '../controllers/orderController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

/**
 * Create order
 */
router.post('/', auth, createOrder);
/**
 * User all orders
 */
router.get('/me', auth, getUserOrders);


/**
 * User active orders
 */
router.get('/active', auth, getActiveOrders);

/**
 * User delivered orders
 */
router.get('/delivered', auth, getDeliveredOrders);

/**
 * Mark order as delivered
 */
router.patch('/:orderId/deliver', auth, markOrderDelivered);

export default router;
