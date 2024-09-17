import mongoose from "mongoose";
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const CouponSchema = new Schema({
    code: { type: String, required: true, unique: true },
    discountType: { type: String, enum: ['percentage', 'fixed'] },
    discountValue: { type: Number, required: true },
    validFrom: { type: Date, required: true },
    validUntil: { type: Date, required: true },
    productsApplicable: [{ type: ObjectId, ref: 'Product' }],
    categoriesApplicable: [{ type: ObjectId, ref: 'Category' }],
    usageLimit: { type: Number },  // Max times the coupon can be used
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  const Coupon =mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema);
  export default Coupon