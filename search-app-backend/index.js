const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/searchapp', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a simple schema for the database
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model('Item', itemSchema);

// Endpoint to get items based on search query
app.get('/api/search', async (req, res) => {
  const { query } = req.query;

  try {
    // Use a regex to perform case-insensitive search
    const items = await Item.find({ name: { $regex: new RegExp(query, 'i') } });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
