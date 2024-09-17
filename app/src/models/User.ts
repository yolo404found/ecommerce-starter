import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // Store hashed passwords
  role: { type: String, enum: ['customer', 'vendor', 'admin'], default: 'customer' },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
  },
  wishlist: [{ type: ObjectId, ref: 'Product' }],
  orders: [{ type: ObjectId, ref: 'Order' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

 const User = mongoose.models.User || mongoose.model('User', UserSchema);
 export default User
