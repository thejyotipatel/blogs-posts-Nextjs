import mongoose from 'mongoose'
import Post from '@/models/Post'
import posts from '@/seedData/data.json'
import dotenv from 'dotenv'

dotenv.config()

async function main() {
  const MONGODB_URL = process.env.MONGODB_URL

  if (!MONGODB_URL) {
    throw new Error('Missing MONGODB_URL')
  }

  await mongoose.connect(MONGODB_URL, { dbName: 'blogDB' })

  console.log('Connected to MongoDB')

  await Post.deleteMany() // Optional: Clears existing data
  console.log(`Cleared data from Post collection`)
  const modelNames = Object.keys(mongoose.models)
  await Post.insertMany(posts)
  console.log(`Seeded ${modelNames[0]} collection with data from data.json`)
  await mongoose.disconnect()
}

main()
  .catch((err) => {
    console.error('Seed error:', err)
  })
  .finally(async () => {
    await mongoose.disconnect()
  })
