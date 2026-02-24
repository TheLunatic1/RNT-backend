const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getCategories, addCategory, deleteCategory } = require('../controllers/categoryController');

router.get('/', auth, getCategories);
router.post('/', auth, addCategory);
router.delete('/:id', auth, deleteCategory);

module.exports = router;