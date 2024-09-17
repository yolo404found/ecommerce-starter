import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const CategorySchema = new Schema({
    name: { type: String, required: true },
    parentCategory: { type: ObjectId, ref: 'Category' },
    children: [{ type: ObjectId, ref: 'Category' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
  export default Category