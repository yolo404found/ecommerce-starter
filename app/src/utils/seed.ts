import mongoose from 'mongoose';
import Product from '@/app/src/models/Product';
import Category from '@/app/src/models/Category';
import User from '@/app/src/models/User';
import Order from '@/app/src/models/Order';
import Review from '@/app/src/models/Review';
import Vendor from '@/app/src/models/Vendor';
import Coupon from '@/app/src/models/Coupon';
import Settings from '@/app/src/models/Settings';
import dbConnect from './dbConnect';

// Sample data
const categories = [
  { name: 'Electronics' },
  { name: 'Books' },
  { name: 'Clothing' }
];

const products = [
  { name: 'Laptop', description: 'A high performance laptop', price: 999.99, category: null, stock: 10, ratingsAverage: 4.5 },
  { name: 'Novel', description: 'A gripping mystery novel', price: 19.99, category: null, stock: 50, ratingsAverage: 4.8 },
  { name: 'T-shirt', description: 'A comfortable cotton T-shirt', price: 9.99, category: null, stock: 100, ratingsAverage: 4.2 }
];

const users = [
  { name: 'John Doe', email: 'john@example.com', password: 'hashed_password', role: 'customer' },
  { name: 'Jane Smith', email: 'jane@example.com', password: 'hashed_password', role: 'admin' }
];

const orders = [
  { user: null, products: [{ productId: null, quantity: 1, price: 999.99 }], shippingAddress: { street: '123 Main St', city: 'Cityville', state: 'CA', country: 'USA', postalCode: '12345' }, status: 'pending', totalAmount: 999.99, paymentStatus: 'pending', shippingMethod: 'Standard' }
];

const reviews = [
  { user: null, product: null, rating: 5, comment: 'Excellent product!' }
];

const vendors = [
  { name: 'Tech Store', address: { street: '456 Tech Ave', city: 'Tech City', state: 'CA', country: 'USA', postalCode: '67890' }, products: [] }
];

const coupons = [
  { code: 'DISCOUNT10', discountType: 'percentage', discountValue: 10, validFrom: new Date(), validUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), productsApplicable: [], categoriesApplicable: [], usageLimit: 100 }
];

const settings = {
  taxRates: [{ country: 'USA', rate: 7.5 }],
  shippingOptions: [{ name: 'Standard Shipping', price: 5.99, deliveryTime: '5-7 days' }],
  currencies: ['USD', 'EUR']
};

const seedDatabase = async () => {
  try {
    await dbConnect();

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    products.forEach((product) => product.category = createdCategories[0]._id);
    
    // Create products
    const createdProducts = await Product.insertMany(products);
    orders[0].products[0].productId = createdProducts[0]._id;

    // Create users
    const createdUsers = await User.insertMany(users);

    // Create orders
    const createdOrders = await Order.insertMany(orders);

    // Create reviews
    const createdReviews = await Review.insertMany(reviews);

    // Create vendors
    const createdVendors = await Vendor.insertMany(vendors);

    // Create coupons
    const createdCoupons = await Coupon.insertMany(coupons);

    // Create settings
    const createdSettings = await Settings.create(settings);

    console.log('Database seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
