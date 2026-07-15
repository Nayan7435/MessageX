const Message = require('../models/Message');
const User = require('../models/User');

// @desc    Get all users except logged in user (chat list ke liye)
// @route   GET /api/messages/users
exports.getUsersForSidebar = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user._id } }).select('-password');
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get messages between two users
// @route   GET /api/messages/:id
exports.getMessages = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId },
            ],
        }).sort({ createdAt: 1 });

        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Send a message
// @route   POST /api/messages/send/:id
exports.sendMessage = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        const { message } = req.body;

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message,
        });

        res.status(201).json({ message: newMessage });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};