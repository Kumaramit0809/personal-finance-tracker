const db = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');

// GET /api/incomes
const getIncomes = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM incomes WHERE user_id = ? ORDER BY date DESC, created_at DESC',
      [req.user.id]
    );
    return sendSuccess(res, { incomes: rows }, 'Incomes fetched successfully');
  } catch (err) {
    console.error('Get incomes error:', err.message);
    return sendError(res, 'Server error fetching incomes');
  }
};

// POST /api/incomes
// Frontend sends: { amount, source, date }
const addIncome = async (req, res) => {
  const { amount, source, date } = req.body;

  if (!amount || !source || !date) {
    return sendError(res, 'Amount, source and date are required', 400);
  }

  try {
    const [result] = await db.query(
      'INSERT INTO incomes (user_id, amount, source, date, frequency, recurring) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, amount, source, date, 'One-time', false]
    );

    const [rows] = await db.query('SELECT * FROM incomes WHERE id = ?', [result.insertId]);

    return sendSuccess(res, { income: rows[0] }, 'Income added successfully', 201);
  } catch (err) {
    console.error('Add income error:', err.message);
    return sendError(res, 'Server error adding income');
  }
};

module.exports = { getIncomes, addIncome };
