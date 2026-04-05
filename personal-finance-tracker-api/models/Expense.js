const express = require('express');
const router = express.Router();
const { getExpenses, addExpense, deleteExpense } = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

// GET  /api/expenses
router.get('/', protect, getExpenses);

// POST /api/expenses
router.post('/', protect, addExpense);

// DELETE /api/expenses/:id
router.delete('/:id', protect, deleteExpense);

module.exports = router;
