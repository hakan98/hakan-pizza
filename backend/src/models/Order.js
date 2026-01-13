import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  pizza: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pizza',
    required: true
  },
  name: String,        // snapshot
  price: Number,       // snapshot
  quantity: {
    type: Number,
    default: 1
  }
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [orderItemSchema],
    totalPrice: Number,
    paymentMethod: {
      type: String,
      enum: ['cash'],
      default: 'cash'
    },
    status: {
      type: String,
      enum: ['active', 'preparing', 'delivered'],
      default: 'active'
    }
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
