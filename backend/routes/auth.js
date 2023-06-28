var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "Name should have at least 3 characters!").isLength({ min: 3 }),
    check("email", "Email is required!").isEmail(),
    check("password", "Password should be of least 9 characters!").isLength({
      min: 8,
    }),
  ],
  signup
);
router.post(
  "/signin",
  [
    check("email", "Please Enter Valid Email").isEmail(),
    check("password", "Password field is required!").isLength({ min: 8 }),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
