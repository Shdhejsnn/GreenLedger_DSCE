const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://green:green223@green.bpinlqu.mongodb.net/greenledger?retryWrites=true&w=majority&appName=green';

// Connect to MongoDB
mongoose.connect(mongoURI).then(() => {
  console.log('MongoDB Connected');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
  process.exit(1); // Exit process with failure if the connection fails
});


// Routes
const companyRoutes = require("./routes/companyRoutes");
app.use("/api", companyRoutes);

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});

// Global error handler to prevent crashes in case of uncaught errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1); // Exit process with failure
});
