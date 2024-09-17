import mongoose from 'mongoose';

const MONGO_URI = process.env.NEXT_PUBLIC_API_URL || 'mongodb://localhost:27017/ecommerceStarter';

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default dbConnect;
