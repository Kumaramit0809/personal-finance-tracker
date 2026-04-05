const express = require('express');
const router = express.Router();
const { getIncomes, addIncome } = require('../controllers/incomeController');
const { protect } = require('../middleware/authMiddleware');

// GET  /api/incomes
router.get('/', protect, getIncomes);

// POST /api/incomes
router.post('/', protect, addIncome);

module.exports = router;
