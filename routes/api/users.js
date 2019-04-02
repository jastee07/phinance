const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

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

module.exports = router;
