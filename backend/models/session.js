const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  },

  district: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },

  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    level: {
      type: Number,
    },
  }],

  userId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community',
    // required: true
  }
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
