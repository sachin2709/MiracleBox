const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  members: [{
    type: mongoose.Schema.ObjectId,
    ref: 'People'
  }],
  userId: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  sessions: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Session'
  }],


});

const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
