const express = require('express');
const router = express.Router();
const { getBudgets, addBudget } = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

// GET  /api/budgets
router.get('/', protect, getBudgets);

// POST /api/budgets
router.post('/', protect, addBudget);

module.exports = router;
