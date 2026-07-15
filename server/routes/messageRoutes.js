const express = require('express');
const router = express.Router();
const { getUsersForSidebar, getMessages, sendMessage } = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

router.get('/users', protect, getUsersForSidebar);
router.get('/:id', protect, getMessages);
router.post('/send/:id', protect, sendMessage);

module.exports = router;