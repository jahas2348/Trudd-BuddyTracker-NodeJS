const SpotModel = require('../models/spotModel');
const SpotUserModel = require('../models/spotUserModel');

// Join Spot
const joinSpot = async (req, res) => {
  try {
    const { spotId, userName, userMobile, longitude, latitude, isLeader } = req.body;

    // Find the spot based on spotId
    const spot = await SpotModel.findOne({ spotId });

    if (!spot) {
      return res.status(200).json({ status: 'failed', message: 'Spot not found' });
    }

    // Create a new spot user
    const newSpotUser = new SpotUserModel({
      userName,
      userMobile,
      longitude,
      latitude,
      isLeader,
    });

    // Add the new spot user to the spot
    spot.spotUsers.push(newSpotUser);

    // Save the updated spot
    await spot.save();

    res.json({
      status: 'success',
      message: 'Joined Spot Successfully',
      user: newSpotUser,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { joinSpot };
