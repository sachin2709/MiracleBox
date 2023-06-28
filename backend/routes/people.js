const express = require('express');
const router = express.Router();

const {
  getAllPeople,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
  getAllPeoplebySession,
  getSessionByPeopleId
} = require('../controllers/people');

const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

// Get all people
router.get('/people/all', getAllPeople);

// Get a person by ID
router.get('/people/:personId', getPerson);

// Create a new person
router.post('/people/create/:sessionId', createPerson);

// Update a person
router.put('/people/:personId', updatePerson);

// Delete a person
router.delete('/people/:personId', deletePerson);

// Get all people by session id
router.get("/session/people/:sessionId",getAllPeoplebySession)

// get session by people id
router.get("/community/session_details/people/:peopleId",getSessionByPeopleId)
module.exports = router;
