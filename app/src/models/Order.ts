import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const OrderSchema = new Schema({
    user: { type: ObjectId, ref: 'User' },
    products: [{
      productId: { type: ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }  // Price at the time of order
    }],
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String
    },
    status: { type: String, enum: ['pending', 'shipped', 'delivered', 'canceled', 'returned'], default: 'pending' },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    shippingMethod: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
  export default Order
  