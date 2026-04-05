const express = require('express');
const router = express.Router();
const { getIncomes, addIncome } = require('../controllers/incomeController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getIncomes);
router.post('/', protect, addIncome);

module.exports = router;