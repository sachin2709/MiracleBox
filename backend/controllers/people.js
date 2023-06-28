const People = require('../models/people');
const Session = require('../models/session')
// Get all people
exports.getAllPeople = (req, res) => {
  People.find()
    .exec((err, people) => {
      if (err) {
        return res.status(400).json({
          error: 'Failed to retrieve people'
        });
      }
      res.json(people);
    });
};

// Get a person by ID
exports.getPerson = (req, res) => {
  People.findById(req.params.personId)
    .exec((err, person) => {
      if (err || !person) {
        return res.status(404).json({
          error: 'Person not found'
        });
      }
      res.json(person);
    });
};

// Create a new person

exports.createPerson = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const personData = req.body;

    // Create a new person
    const person = new People(personData);
    await person.save();

    // Push the person ID into the attendees attribute of the session schema
    await Session.updateOne(
      { _id: sessionId },
      { $push: { attendees: person._id } }
    );

    res.status(201).json(person);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create the person' });
  }
};


// Update a person

// exports.updatePerson = (req, res) => {
//   const { personId } = req.params;
//   const { sessions } = req.body;

//   People.findByIdAndUpdate(
//     personId,
//     { $push: { sessions: { $each: sessions } } },
//     { new: true, useFindAndModify: false },
//     (err, updatedPerson) => {
//       if (err) {
//         console.error(err);
//         return res.status(400).json({
//           error: 'Failed to update person'
//         });
//       }
//       res.json(updatedPerson);
//     }
//   );
// };
// Update a person
exports.updatePerson = (req, res) => {
  console.log(req.body); 
  People.findByIdAndUpdate(
    req.params.personId,
    {
      $set: req.body,
      
    },
    { new: true, useFindAndModify: false },
    (err, updatedPerson) => {
      if (err) {
        return res.status(400).json({
          error: 'Failed to update person'
        });
      }
      res.json(updatedPerson);
    }
  );
};



// Delete a person
exports.deletePerson = (req, res) => {
  People.findByIdAndRemove(req.params.personId, { useFindAndModify: false }, (err, deletedPerson) => {
    if (err || !deletedPerson) {
      return res.status(400).json({
        error: 'Failed to delete person'
      });
    }
    res.json({
      message: 'Person deleted successfully'
    });
  });
};

//get all people by session
exports.getAllPeoplebySession = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ error: 'Community not found' });
    }

    const attendeeIds = session.attendees;

    const attendees = await People.find({ _id: { $in: attendeeIds } });

    console.log('attendees by sessions', attendeeIds);
    console.log(attendees);
    res.json(attendees);
  } catch (err) {
    console.error('Error retrieving sessions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getSessionByPeopleId = async (req, res) => {
  const { peopleId } = req.params;

  try {
    const session = await Session.findOne({ attendees: peopleId });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json(session);
  } catch (err) {
    console.error('Error retrieving session:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};