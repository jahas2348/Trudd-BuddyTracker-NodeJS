const express = require('express');
const router  = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

const userController = require('../controllers/userController');

//Join Spot
router.post('/api/user/joinspot', userController.joinSpot);

module.exports = router ;