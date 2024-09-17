import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const ReviewSchema = new Schema({
    user: { type: ObjectId, ref: 'User' },
    product: { type: ObjectId, ref: 'Product' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
    createdAt: { type: Date, default: Date.now }
  });
  
  const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);
  export default Review