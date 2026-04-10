import Incident from '../models/Incident.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';

// @desc    Create an incident
// @route   POST /api/incidents
export const createIncident = async (req, res) => {
    try {
        const { title, description, location } = req.body;

        const incident = await Incident.create({
            title,
            description,
            location,
            userId: req.user._id,
        });

        // Notify Admins
        const admins = await User.find({ role: 'Admin' });
        const notifications = admins.map((admin) => ({
            message: `New incident reported: ${title}`,
            userId: admin._id,
        }));
        
        if (notifications.length > 0) {
            await Notification.insertMany(notifications);
        }

        res.status(201).json(incident);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get incidents
// @route   GET /api/incidents
export const getIncidents = async (req, res) => {
    try {
        let incidents;

        // Admin sees all, Student/Faculty see only theirs
        if (req.user.role === 'Admin') {
            incidents = await Incident.find({}).populate('userId', 'name email');
        } else {
            incidents = await Incident.find({ userId: req.user._id }).populate('userId', 'name email');
        }

        res.json(incidents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update incident status (Admin only)
// @route   PUT /api/incidents/:id
export const updateIncidentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const incidentId = req.params.id;

        const incident = await Incident.findById(incidentId);

        if (!incident) {
            return res.status(404).json({ message: 'Incident not found' });
        }

        incident.status = status;
        const updatedIncident = await incident.save();

        // Notify User about status update
        await Notification.create({
            message: `Your incident '${incident.title}' status was updated to '${status}'`,
            userId: incident.userId,
        });

        res.json(updatedIncident);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
