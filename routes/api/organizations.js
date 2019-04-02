const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

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
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    // if (!isValid) {
    //   // Return any errors with 400 status
    //   return res.status(400).json(errors);
    // }
    if (req.user.role !== "admin") {
      return res
        .status(400)
        .json({ error: "User needs admin status to do this" });
    }
    Organization.findById(req.user.organization).then(organization => {
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

// @route   PUT api/organization/budget/:id
// @desc    Add budget to organization
// @access  Private
router.put(
  "/budget/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    // if (!isValid) {
    //   // Return any errors with 400 status
    //   return res.status(400).json(errors);
    // }
    if (req.user.role !== "admin") {
      return res
        .status(400)
        .json({ error: "User needs admin status to do this" });
    }

    Organization.findById(req.user.organization).then(organization => {
      // Add to budgets array
      if (!organization) {
        return res.status(404).json({ error: "Budget does not exist" });
      }
      const id = req.params.id;
      organization.budgets.id(id).title = req.body.title;
      organization.budgets.id(id).amount = req.body.amount;
      organization.budgets.id(id).revenue = req.body.revenue;

      organization.save().then(organization => res.json(organization));
    });
  }
);

// @route   DELETE api/organization/budget/:id
// @desc    Delete budget from organization
// @access  Private
router.delete(
  "/budget/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Organization.findById(req.user.organization)
      .then(organization => {
        if (req.user.role !== "admin") {
          return res
            .status(400)
            .json({ unauthorized: "Must be an admin to access this page" });
        }

        if (!organization.budgets.id(req.params.id)) {
          return res.status(404).json({ error: "Budget does not exist" });
        }
        // Splice out of array
        organization.budgets.pull({ _id: req.params.id });
        // Save
        organization.save().then(organization => res.json(organization));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/organization/budget/:bud_id/transactions
// @desc    Add budget to organization
// @access  Private
router.post(
  "/budget/:bud_id/transactions",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    // if (!isValid) {
    //   // Return any errors with 400 status
    //   return res.status(400).json(errors);
    // }
    if (req.user.role !== "admin") {
      return res
        .status(400)
        .json({ error: "User needs admin status to do this" });
    }
    Organization.findById(req.user.organization).then(organization => {
      const newTransaction = {
        title: req.body.title,
        amount: req.body.amount,
        revenue: req.body.revenue
      };

      // Add to budgets array
      organization.budgets
        .id(req.params.bud_id)
        .transactions.unshift(newTransaction);

      organization.save().then(organization => res.json(organization));
    });
  }
);

module.exports = router;
