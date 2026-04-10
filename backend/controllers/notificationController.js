import Notification from '../models/Notification.js';

// @desc    Get logged in user notifications
// @route   GET /api/notifications
export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

