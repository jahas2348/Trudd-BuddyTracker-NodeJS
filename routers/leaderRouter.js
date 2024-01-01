const express = require('express');
const router  =express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

const leaderController = require('../controllers/leaderController');


//Create Spot
router.post('/api/leader/createspot',leaderController.createSpot);

// Edit Spot
router.put('/api/leader/editspot/:id', leaderController.editSpot);

module.exports = router;
