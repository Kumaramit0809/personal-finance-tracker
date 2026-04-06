const db = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');


const getBudgets = async (req, res) => {
  const currentMonth = new Date().toISOString().slice(0, 7); 

  try {
    const [rows] = await db.query(
      `SELECT 
        b.id,
        b.category,
        b.amount AS \`limit\`,
        b.month,
        COALESCE(SUM(e.amount), 0) AS spent
      FROM budgets b
      LEFT JOIN expenses e 
        ON e.user_id = b.user_id 
        AND e.category = b.category 
        AND DATE_FORMAT(e.date, '%Y-%m') = b.month
      WHERE b.user_id = ? AND b.month = ?
      GROUP BY b.id`,
      [req.user.id, currentMonth]
    );

    return sendSuccess(res, { budgets: rows }, 'Budgets fetched successfully');
  } catch (err) {
    console.error('Get budgets error:', err.message);
    return sendError(res, 'Server error fetching budgets');
  }
};


const addBudget = async (req, res) => {
  const { category, limit } = req.body;

  if (!category || !limit) {
    return sendError(res, 'Category and limit are required', 400);
  }

  const currentMonth = new Date().toISOString().slice(0, 7);

  try {
    // Upsert: if budget for this category+month already exists, update it
    await db.query(
      `INSERT INTO budgets (user_id, category, amount, month)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE amount = VALUES(amount)`,
      [req.user.id, category, limit, currentMonth]
    );

    // Fetch the upserted row with spent amount
    const [rows] = await db.query(
      `SELECT 
        b.id,
        b.category,
        b.amount AS \`limit\`,
        b.month,
        COALESCE(SUM(e.amount), 0) AS spent
      FROM budgets b
      LEFT JOIN expenses e 
        ON e.user_id = b.user_id 
        AND e.category = b.category 
        AND DATE_FORMAT(e.date, '%Y-%m') = b.month
      WHERE b.user_id = ? AND b.category = ? AND b.month = ?
      GROUP BY b.id`,
      [req.user.id, category, currentMonth]
    );

    return sendSuccess(res, { budget: rows[0] }, 'Budget saved successfully', 201);
  } catch (err) {
    console.error('Add budget error:', err.message);
    return sendError(res, 'Server error saving budget');
  }
};

module.exports = { getBudgets, addBudget };
