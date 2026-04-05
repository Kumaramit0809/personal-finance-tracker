const db = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');

// GET /api/expenses
const getExpenses = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC, created_at DESC',
      [req.user.id]
    );
    return sendSuccess(res, { expenses: rows }, 'Expenses fetched successfully');
  } catch (err) {
    console.error('Get expenses error:', err.message);
    return sendError(res, 'Server error fetching expenses');
  }
};

// POST /api/expenses
const addExpense = async (req, res) => {
  const { amount, category, description, date } = req.body;

  if (!amount || !date) {
    return sendError(res, 'Amount and date are required', 400);
  }

  try {
    const [result] = await db.query(
      'INSERT INTO expenses (user_id, amount, category, description, date) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, amount, category || null, description || null, date]
    );

    const [rows] = await db.query('SELECT * FROM expenses WHERE id = ?', [result.insertId]);

    return sendSuccess(res, { expense: rows[0] }, 'Expense added successfully', 201);
  } catch (err) {
    console.error('Add expense error:', err.message);
    return sendError(res, 'Server error adding expense');
  }
};

// DELETE /api/expenses/:id
const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      'SELECT * FROM expenses WHERE id = ? AND user_id = ?',
      [id, req.user.id]
    );

    if (rows.length === 0) {
      return sendError(res, 'Expense not found or unauthorized', 404);
    }

    await db.query('DELETE FROM expenses WHERE id = ?', [id]);

    return sendSuccess(res, {}, 'Expense deleted successfully');
  } catch (err) {
    console.error('Delete expense error:', err.message);
    return sendError(res, 'Server error deleting expense');
  }
};

module.exports = { getExpenses, addExpense, deleteExpense };
