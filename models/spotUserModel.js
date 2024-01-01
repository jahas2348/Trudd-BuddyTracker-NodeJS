const mongoose = require('mongoose');
const db = require('../config/dbConfig');
const { Schema } = mongoose;

const spotUserSchema = new Schema({
  userName: {
    type: String,
  },
  userMobile: {
    type: String,
  },
  longitude: {
    type: String,
  },
  latitude: {
    type: String,
  },
  isLeader: {
    type: Boolean,
    default: false,
  },
});

const SpotUserModel = db.model('spotUser', spotUserSchema);
module.exports = SpotUserModel;