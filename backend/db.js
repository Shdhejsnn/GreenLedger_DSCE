const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://green:green223@green.bpinlqu.mongodb.net/?retryWrites=true&w=majority&appName=green'; // Your URI

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
