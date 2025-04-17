// routes/emergencyRoutes.js
const express = require('express');
const { reportEmergency, GetreportEmergencyByUser, GetAllreportEmergency, UpdateEmergencyStatus } = require('../controllers/emergencycontroller');
const router = express.Router();

router.post('/report', reportEmergency);
router.get('/:userId', GetreportEmergencyByUser);
router.get('/', GetAllreportEmergency);
router.put('/:id', UpdateEmergencyStatus);

module.exports = router;
