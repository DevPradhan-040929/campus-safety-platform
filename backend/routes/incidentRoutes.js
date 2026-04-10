import express from 'express';
import { createIncident, getIncidents, updateIncidentStatus } from '../controllers/incidentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, createIncident)
    .get(protect, getIncidents);

router.route('/:id')
    .put(protect, authorizeRoles('Admin'), updateIncidentStatus);

export default router;
