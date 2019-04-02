const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//Load User Model
const User = require("../../models/User");
//Load Organization Model
const Organization = require("../../models/Organization");

router.get("/test", (req, res) => res.json({ msg: "Organizations works" }));

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email already exists" });
    } else {
      const newOrganization = new Organization({
        name: req.body.name
      });
      newOrganization.save().then(organization => {
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: req.body.password,
          role: "admin",
          organization: organization,
          email: req.body.email
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                newOrganization.members.push(user);
                newOrganization
                  .save()
                  .then(organization => res.json(organization))
                  .catch(err =>
                    res
                      .status(400)
                      .json({ addAdmin: "Could not add admin to organization" })
                  );
              })
              .catch(err => console.log(err));
          });
        });
      });
    }
  });
});

module.exports = router;
