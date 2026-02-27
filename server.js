const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Expense Tracker API running'));

app.use('/api/auth', require('./routes/auth'));

app.use('/api/categories', require('./routes/categories'));


// ... existing imports and code ...

app.use('/api/expenses', require('./routes/expenses'));

// Global error handler (already there or add if missing)
app.use((err, req, res, next) => {
  console.error('Global error:', err.message);
  res.status(500).json({ msg: 'Internal Server Error' });
});

// Global error handler (catches unhandled errors)
app.use((err, req, res, next) => {
  console.error('Global error:', err.message);
  console.error('Stack:', err.stack);
  res.status(500).json({ msg: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));