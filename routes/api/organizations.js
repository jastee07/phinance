const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//Load User Model
const User = require("../../models/User");
//Load Organization Model
const Organization = require("../../models/Organization");

router.get("/test", (req, res) => res.json({ msg: "Organizations works" }));

//POST Organization
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

// @route   POST api/organization/budget
// @desc    Add budget to organization
// @access  Private
router.post(
  "/budget",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    // if (!isValid) {
    //   // Return any errors with 400 status
    //   return res.status(400).json(errors);
    // }

    Organization.findOne({ name: req.body.name }).then(organization => {
      const newBudget = {
        title: req.body.title,
        amount: req.body.amount,
        revenue: req.body.revenue
      };

      // Add to budgets array
      organization.budgets.unshift(newBudget);

      organization.save().then(organization => res.json(organization));
    });
  }
);

// // @route   PUT api/organization/budget
// // @desc    Update budget in organization
// // @access  Private
// router.put(
//   "/budget",
//   //passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     //const { errors, isValid } = validateExperienceInput(req.body);

//     // Check Validation
//     // if (!isValid) {
//     //   // Return any errors with 400 status
//     //   return res.status(400).json(errors);
//     // }

//     Organization.findOne({ name: req.body.name }).then(organization => {
//       const updateIndex = organization.budgets
//         .map(item => item.title)
//         .indexOf(req.params.bud_title);

//       // Get proper budget
//       let budget = organization.budgets[updateIndex];

//       budget = {
//         title: req.body.title,
//         amount: req.body.amount,
//         revenue: req.body.revenue
//       }

//       organization.save().then(organization => res.json(organization));
//     });
//   }
// );

// @route   DELETE api/organization/budget/:bud_title
// @desc    Delete budget from organization
// @access  Private
router.delete(
  "/budget/:bud_title",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Organization.findOne({ name: req.body.name })
      .then(organization => {
        const removeIndex = organization.budgets
          .map(item => item.title)
          .indexOf(req.params.bud_title);

        // Splice out of array
        organization.budgets.splice(removeIndex, 1);

        // Save
        organization.save().then(organization => res.json(organization));
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
