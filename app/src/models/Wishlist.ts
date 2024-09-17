import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const WishlistSchema = new Schema({
    user: { type: ObjectId, ref: 'User' },
    products: [{ type: ObjectId, ref: 'Product' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', WishlistSchema);
  export default Wishlist