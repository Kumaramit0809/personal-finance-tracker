const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db');

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://personal-finance-tracker008.netlify.app'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('CORS not allowed for this origin'));
    },
    credentials: true
  })
);

app.use(express.json());

// Test DB connection
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('✅ MySQL connected successfully');
    connection.release();
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
  }
})();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/incomes', require('./routes/incomes'));
app.use('/api/budgets', require('./routes/budgets'));

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'FinTrack API running ✅'
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});