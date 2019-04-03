const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const validateUserRegisterInput = require("../../validation/userRegister");

//Load User Model
const User = require("../../models/User");

//Test
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

// @route GET api/users/login
// @desc Login User / Return JWT
// @access Public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    //check for user
    if (!user) {
      return res.status(404).json({ login: "Invalid email or password" });
    }

    //Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //Login Success

        const payload = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          organization: user.organization,
          role: user.role,
          email: user.email
        };

        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 86400 },
          (err, token) => {
            res.json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        //Login Failed
        return res.status(400).json({ login: "Invalid email or password" });
      }
    });
  });
});

// @route   POST api/users/register
// @desc    Route for admin to register other users
// @access  Private
router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateUserRegisterInput(req.body);

    //Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    if (req.user.role !== "admin") {
      return res
        .status(400)
        .json({ error: "User needs admin status to do add other users" });
    }

    // Check if email already exists
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: req.body.password,
          role: "member",
          organization: req.user.organization,
          email: req.body.email
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => )
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
);

module.exports = router;
