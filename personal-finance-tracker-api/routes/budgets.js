const express = require('express');
const router = express.Router();
const { getBudgets, addBudget } = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getBudgets);
router.post('/', protect, addBudget);

module.exports = router;