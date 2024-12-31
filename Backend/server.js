const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware to enable CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Frontend URL for APIs
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware to parse JSON requests
app.use(bodyParser.json());

// MongoDB connection
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('Error: MONGO_URI is not defined in the .env file.');
  process.exit(1);
}

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err.message);
    process.exit(1);
  });

// Importing routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Serve static files from the dynamically built "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route to serve frontend files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve "index.html" as the entry point
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
