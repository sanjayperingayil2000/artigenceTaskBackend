import mongoose from 'mongoose';

export default async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI not set in environment');
  mongoose.set('strictQuery', true);

  await mongoose.connect(uri, {
    autoIndex: true
  });

  console.log('MongoDB connected');
}
