const Community = require("../models/community");

// Get all communities
exports.getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find();
    res.json(communities);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch communities" });
  }
};

// Get a specific community by ID
exports.getCommunity = async (req, res) => {
  try {
    const community = await Community.findById(req.params.commId);
    if (community) {
      res.json(community);
    } else {
      res.status(404).json({ error: "Community not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the community" });
  }
};

// Create a new community
exports.createCommunity = async (req, res) => {
  try {
    

    const community = new Community(req.body);
    await community.save();
    res.status(201).json(community);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create the community' });
  }
};

// Update a community
exports.updateCommunity = async (req, res) => {
  try {
    console.log(req.body)
    const community = await Community.findByIdAndUpdate(
      req.params.commId,
      req.body,
      { new: true }
    );
    if (community) {
      res.json(community);
    } else {
      res.status(404).json({ error: "Community not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update the community" });
  }
};

// Delete a community
exports.deleteCommunity = async (req, res) => {
  try {
    const community = await Community.findByIdAndDelete(req.params.commId);
    if (community) {
      res.json({ message: "Community deleted successfully" });
    } else {
      res.status(404).json({ error: "Community not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the community" });
  }
};
