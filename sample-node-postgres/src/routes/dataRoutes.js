const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

// Define API routes here

// GET /api/data/:keyword
// Supported Keywords: Dailytracker, MONTHWISE, ECpb, target
router.get('/:keyword', dataController.getDataByKeyword);

module.exports = router;
