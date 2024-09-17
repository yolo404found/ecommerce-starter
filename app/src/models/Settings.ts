import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const SettingsSchema = new Schema({
    taxRates: [{
      country: String,
      rate: Number
    }],
    shippingOptions: [{
      name: String,
      price: Number,
      deliveryTime: String
    }],
    currencies: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
  export default Settings