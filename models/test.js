const mongoose = require('mongoose');
const db = require('../config/dbConfig');
const { Schema } = mongoose;

// Nested schema for spotUsers
const spotUserSchema = new Schema({
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  userMobileNumber: {
    type: String,
    required: true,
  },
});

const spotSchema = new Schema({
  leader: {
    type: String,
  },
  leaderNumber: {
    type: String,
  },
  spotId: {
    type: String,
  },
  spotInstructions: {
    type: String,
  },
  spotUsers: {
    type: [spotUserSchema], // Use the nested schema for spotUsers
  },
});

const SpotModel = db.model('spot', spotSchema);
module.exports = SpotModel;
