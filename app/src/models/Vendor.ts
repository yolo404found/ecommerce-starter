import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const VendorSchema = new Schema({
    name: { type: String, required: true },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String
    },
    products: [{ type: ObjectId, ref: 'Product' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  const Vendor = mongoose.models.Vendor || mongoose.model('Vendor', VendorSchema);
  export default Vendor