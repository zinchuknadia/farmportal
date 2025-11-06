// backend/server.js
const express = require('express');
// const cors = require('cors'); // to allow requests from frontend

const app = express();
const PORT = 5000;

// Middleware
// app.use(cors());
app.use(express.json());

// Example route
app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, name: 'Organic Apples', price: 3.5 },
    { id: 2, name: 'Fresh Milk', price: 2.0 },
    { id: 3, name: 'Honey', price: 5.0 }
  ]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
