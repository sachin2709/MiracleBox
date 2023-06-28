const Session = require('../models/session');
const Community = require('../models/community');
const { isAuthenticated } = require('./auth');
const User=require('../models/user')

// Get a session by ID
exports.getSession = (req, res) => {
  const sessionId = req.params.sessionId;
  Session.findById(sessionId)
    .exec((err, session) => {
      if (err || !session) {
        return res.status(404).json({
          error: 'Session not found'
        });
      }
      // console.log(session);
      res.json(session);
    });
};

// Create a new session
exports.createSession = async (req, res) => {
  try {
    const { communityId } = req.params;
    const sessionData = req.body;
    const userId = req.body.user._id; // Get the user ID from req.body
    console.log(userId)
    // Create a new session
    const session = new Session(sessionData);
    session.userId.push(userId); // Add the user ID to the userIds array
    session.community = communityId; // Set the community ID in the session
    await session.save();

    // Push the session ID into the session_ids attribute of the community schema
    await Community.updateOne(
      { _id: communityId },
      { $push: { sessions: session._id } }
    );

    // Push the session ID into the organizedSessions array of the user schema
    await User.updateOne(
      { _id: userId },
      { $push: { organizedSessions: session._id } }
    );

    res.status(201).json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create the session' });
  }
};

// Update a session
exports.updateSession = (req, res) => {
  const sessionId = req.params.sessionId;
  Session.findByIdAndUpdate(
    sessionId,
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, session) => {
      if (err || !session) {
        return res.status(400).json({
          error: 'Failed to update session'
        });
      }
      res.json(session);
    }
  );
};

// Delete a session
exports.deleteSession = (req, res) => {
  const sessionId = req.params.sessionId;
  Session.findByIdAndRemove(sessionId, { useFindAndModify: false }, (err, session) => {
    if (err || !session) {
      return res.status(400).json({
        error: 'Failed to delete session'
      });
    }
    res.json({
      message: 'Session deleted successfully'
    });
  });
};

// Add an attendee to a session
exports.addAttendee = (req, res) => {
  const sessionId = req.params.sessionId;
  const userId = req.body.userId;
  Session.findByIdAndUpdate(
    sessionId,
    { $push: { attendees: userId } },
    { new: true, useFindAndModify: false },
    (err, session) => {
      if (err || !session) {
        return res.status(400).json({
          error: 'Failed to add attendee'
        });
      }
      res.json(session);
    }
  );
};

// Remove an attendee from a session
exports.removeAttendee = (req, res) => {
  const sessionId = req.params.sessionId;
  const userId = req.body.userId;
  Session.findByIdAndUpdate(
    sessionId,
    { $pull: { attendees: userId } },
    { new: true, useFindAndModify: false },
    (err, session) => {
      if (err || !session) {
        return res.status(400).json({
          error: 'Failed to remove attendee'
        });
      }
      res.json(session);
    }
  );
};

//To retrieve all sessions attended by a particular community
exports.getSessionByCommunity = async (req, res) => {
  const { communityId } = req.params;
  try {
    const community = await Community.findById(communityId);

    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }
    const auth = isAuthenticated
    const sessionIds = community.sessions;

    const sessions = await Session.find({ _id: { $in: sessionIds } });

    console.log('Sessions attended by Community', communityId);
    console.log(sessions);
    res.json(sessions);
  } catch (err) {
    console.error('Error retrieving sessions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.postCommId = async (req, res) => {
  const { communityId } = req.params;
  try {
    const community = await Community.findById(communityId);

    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }
    const Userid = req.body._id;
    if (Userid)
      community.userId.push(Userid);
    else
      res.status(500).json({ error: 'Internal server error' });

    const updatedCommunity = await community.save();

    res.json(updatedCommunity);

  } catch (err) {
    console.error('Error retrieving sessions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


