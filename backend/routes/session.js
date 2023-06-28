const express = require('express');
const router = express.Router();

const {
  getSession,
  createSession,
  updateSession,
  deleteSession,
  addAttendee,
  removeAttendee,
  getSessionByCommunity,
  postCommId,
  
} = require('../controllers/session');

const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');

const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);


// Get a session by ID
router.get('/session_details/:sessionId', getSession);

// Create a new session
// router.post('/session/create/:userId', isSignedIn, isAuthenticated, isAdmin, createSession);

router.post('/session/create/:communityId', createSession);
router.post('/sessions/:communityId', postCommId);

// Update a session
router.put('/session/:sessionId', updateSession);

// Delete a session
router.delete('/session/:sessionId', deleteSession);

// Add an attendee to a session
router.put('/session/:sessionId/add-attendee', addAttendee);

// Remove an attendee from a session
router.put('/session/:sessionId/remove-attendee', removeAttendee);

router.get('/session/:communityId',getSessionByCommunity)



module.exports = router;
