import Order from '../models/Order.js';
import Pizza from '../models/Pizza.js';

/* CREATE ORDER */
import mongoose from 'mongoose';



export const createOrder = async (req, res) => {
  console.log('🔥 BODY:', req.body);
  console.log('🔥 ITEMS:', req.body.items);

  try {
    const userId = req.user.id;
    const { items } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ message: 'Order items required' });
    }

    // 🔑 STRING → ObjectId
    const pizzaIds = items.map(i => new mongoose.Types.ObjectId(i.pizzaId));

    const pizzas = await Pizza.find({
      _id: { $in: pizzaIds }
    });

    const pizzaMap = {};
    pizzas.forEach(p => {
      pizzaMap[p._id.toString()] = p;
    });

    const orderItems = items.map(i => {
      const pizza = pizzaMap[i.pizzaId.toString()];
      if (!pizza) {
        throw new Error(`Pizza not found: ${i.pizzaId}`);
      }

      return {
        pizza: pizza._id,
        name: pizza.name,
        price: pizza.price,
        quantity: i.quantity || 1
      };
    });

    const totalPrice = orderItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalPrice,
      status: 'active'
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


/* USER – ALL ORDERS */
export const getUserOrders = async (req, res) => {
  const orders = await Order.find({
    user: req.user.id
  }).sort({ createdAt: -1 });

  res.json(orders);
};

/* ADMIN – MARK DELIVERED */
export const markOrderDelivered = async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findByIdAndUpdate(
    orderId,
    { status: 'delivered' },
    { new: true }
  );

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  res.json(order);
};

/* ADMIN – ACTIVE ORDERS */
export const getActiveOrders = async (req, res) => {
  const orders = await Order.find({
    status: 'active'
  }).sort({ createdAt: -1 });

  res.json(orders);
};

/* ADMIN – DELIVERED ORDERS */
export const getDeliveredOrders = async (req, res) => {
  const orders = await Order.find({
    status: 'delivered'
  }).sort({ updatedAt: -1 });

  res.json(orders);
};
