const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  getAllUser,
  createUser,
  
} = require("../controllers/user");

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);
// router.post("user/create",createUser);
router.get("/user/all",  getAllUser);
router.get("/user/:userId",  getUser);
router.put("/user/:userId",  updateUser);



module.exports = router;
