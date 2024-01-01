const SpotModel = require('../models/spotModel');

// Create Spot with Leader
const createSpot = async (req, res) => {
  try {
    const { leaderName, leaderMobile, spotInstructions, spotUsers, latitude, longitude } = req.body;

    // Create Spot with Leader
    const createSpot = new SpotModel({
      leaderName,
      leaderMobile,
      spotInstructions,
      latitude,
      longitude,
      spotUsers,
    });

    // Create a new spot user for the leader
    const leaderSpotUser = {
      userName: leaderName,
      userMobile: leaderMobile,
      latitude,
      longitude,
      isLeader: true,
    };

    createSpot.spotUsers.push(leaderSpotUser);

    // Save the spot with leader
    const spot = await createSpot.save();

    res.json({
      status: 'success',
      message: 'Spot Registered Successfully',
      spotId: spot.spotId,
      id: spot.id,
      user: createSpot.spotUsers[0],

    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Edit Spot (Update latitude and longitude)
const editSpot = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const { id } = req.params; // Corrected from _id to id

    // Find the spot based on _id
    const spot = await SpotModel.findById(id); // Corrected from _id to id

    if (!spot) {
      return res.status(404).json({ status: 'error', message: 'Spot not found' });
    }

    // Update latitude and longitude
    spot.latitude = latitude;
    spot.longitude = longitude;

    // Save the updated spot
    await spot.save();

    res.json({
      status: 'success',
      message: 'Spot edited successfully',
      spotId: spot.spotId,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { createSpot, editSpot };
