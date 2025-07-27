import express from 'express';
import { addNewTelemetryData, decommissionDevice, decommissionDeviceValidation, deviceSummary, getAllDevices, getDeviceHealth, registerDeviceValidation, registerNewDevice, registerTelemetryValidation } from '../controllers/deviceControllers';
import { authorize } from '../middleware/authorize';
import { apiLimiter } from '../middleware/rateLimiter';
import { throttle } from '../middleware/rateLimiter';

const router = express.Router();


router.use(apiLimiter); // General API rate limiting

router.use(throttle); // Throttling to prevent abuse

router.post('/register', authorize(['Admin']), registerDeviceValidation, registerNewDevice);

router.get('/allDevices', authorize(['Admin', 'User']), getAllDevices)

// For adding new Teloemetry data
router.post('/:id/telemetry', authorize(['Admin']), registerTelemetryValidation, addNewTelemetryData);

router.get('/:id/health', authorize(['Admin', 'User']), getDeviceHealth);

router.put('/:id/decommission', authorize(['Admin']), decommissionDeviceValidation, decommissionDevice);

router.get('/summary',  deviceSummary);

export default router;
