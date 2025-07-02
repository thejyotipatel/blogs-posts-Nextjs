import mongoose from 'mongoose'
const MONGODB_URL = process.env.MONGODB_URL as string

export default async function dbConnect() {
  try {
    await mongoose.connect(MONGODB_URL, {
      dbName: 'blogDB',
    })
    console.log('✅ MongoDB connected successfully')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    process.exit(1)
  }
}
