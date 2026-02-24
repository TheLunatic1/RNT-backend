const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getExpenses, addExpense, deleteExpense, updateExpense } = require('../controllers/expenseController');

router.get('/', auth, getExpenses);
router.post('/', auth, addExpense);
router.delete('/:id', auth, deleteExpense);
router.put('/:id', auth, updateExpense);

module.exports = router;