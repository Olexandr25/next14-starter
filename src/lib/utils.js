const { default: mongoose } = require('mongoose')

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO)
  } catch (error) {
    console.error('Error connecting to database:', error)
    throw new Error(error)
  }
}
