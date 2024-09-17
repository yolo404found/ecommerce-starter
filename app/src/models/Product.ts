import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },  // Price in smallest currency unit
    category: { type: ObjectId, ref: 'Category' },
    images: [String],  // Array of image URLs
    stock: { type: Number, required: true },
    vendor: { type: ObjectId, ref: 'Vendor' },
    reviews: [{ type: ObjectId, ref: 'Review' }],
    ratingsAverage: { type: Number, default: 0 },  // Average rating (1-5)
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
  export default Product
  