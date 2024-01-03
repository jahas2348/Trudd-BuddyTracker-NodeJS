const mongoose = require('mongoose');
const { Schema } = mongoose;
const uuid = require('uuid');
const SpotUserModel = require('./spotUserModel');

const spotSchema = new Schema({
  leaderName: {
    type: String,
    required: true,

  },
  leaderMobile: {
    type: String,
    required: true,
  },
  
  spotId: {
    type: String,
    default: () => {
      const generatedId = uuid.v4().toUpperCase().replace(/-/g, '').substring(0, 12);
      return `${generatedId.slice(0, 4)}-${generatedId.slice(4, 8)}-${generatedId.slice(8)}`;
    },
    unique: true,
  },
  spotInstructions: {
    type: String,
  },
  latitude:{
    type: String,
  },
  longitude:{
    type: String,
  },
  spotUsers: {
    type: [SpotUserModel.schema], // Use the schema from the spotUserModel
    default: [],
  },
});

const SpotModel = mongoose.model('spot', spotSchema);
module.exports = SpotModel;
