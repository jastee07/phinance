const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");

//Load Input Validation
const validateOrgRegisterInput = require("../../validation/orgRegister");
const validateUserRegisterInput = require("../../validation/userRegister");
const validateBudgetInput = require("../../validation/budget");

//Load User Model
const User = require("../../models/User");
//Load Organization Model
const Organization = require("../../models/Organization");

router.get("/test", (req, res) => res.json({ msg: "Organizations works" }));

// @route   GET api/organization/register
// @desc    Create a new organization
// @access  Public
router.post("/register", (req, res) => {
  //Check validations for organization
  let { errors, isValid } = validateOrgRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Check validations for User
  let { userErrors, isUserValid } = validateUserRegisterInput(req.body);

  //Check Validation
  if (!isUserValid) {
    return res.status(400).json(userErrors);
  }

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

// @route   GET api/organizations/:id
// @desc    Get Current user's Organization
// @access  Public
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Organization.findOne({ _id: req.user.organization })
      .then(org => {
        if (!org) {
          errors.noorg = "There is no organization for this user";
          return res.status(404).json(errors);
        }
        res.json(org);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/organization/budget/:id
// @desc    Get budget from organization
// @access  Private
router.get(
  "/budget/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    // if (!isValid) {
    //   // Return any errors with 400 status
    //   return res.status(400).json(errors);
    // }
    Organization.findById(req.user.organization).then(organization => {
      const budget = organization.budgets.id(req.params.id);
      if (!budget) {
        return res.status(404).json({ error: "Budget does not exist" });
      }
      return res.json(budget);
    });
  }
);

// @route   POST api/organizations/budget
// @desc    Add budget to organization
// @access  Private
router.post(
  "/budget",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBudgetInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    if (req.user.role !== "admin") {
      return res
        .status(400)
        .json({ error: "User needs admin status to do this" });
    }
    Organization.findById(req.user.organization)
      .then(organization => {
        const newBudget = {
          title: req.body.title,
          amount: req.body.amount,
          revenue: req.body.revenue
        };

        // Add to budgets array
        organization.budgets.unshift(newBudget);

        organization
          .save()
          .then(organization => res.json(organization.budgets[0]))
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(400).json(err));
  }
);

// @route   PUT api/organization/budget/:id
// @desc    Edit Budget
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
      const id = req.params.id;
      if (!organization.budgets.id(id)) {
        return res.status(404).json({ error: "Budget does not exist" });
      }

      organization.budgets.id(id).title = req.body.title;
      organization.budgets.id(id).amount = req.body.amount;
      organization.budgets.id(id).revenue = req.body.revenue;

      organization
        .save()
        .then(organization => res.json(organization.budgets.id(id)));
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
        organization.save().then(organization => res.json({ success: true }));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/organization/budget/:bud_id/transactions/:tran_id
// @desc    Get a transaction from a budget
// @access  Private
router.get(
  "/budget/:bud_id/transactions/:tran_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    // if (!isValid) {
    //   // Return any errors with 400 status
    //   return res.status(400).json(errors);
    // }
    Organization.findById(req.user.organization).then(organization => {
      const transaction = organization.budgets
        .id(req.params.bud_id)
        .transactions.id(req.params.tran_id);

      if (!transaction) {
        return res.status(404).json({ error: "Transaction does not exist" });
      }
      return res.json(transaction);
    });
  }
);

// @route   POST api/organization/budget/:bud_id/transactions
// @desc    Add a transaction to a budget
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
    Organization.findById(req.user.organization)
      .then(organization => {
        const newTransaction = {
          title: req.body.title,
          amount: req.body.amount,
          description: req.body.description
        };

        // Add to budgets array
        organization.budgets
          .id(req.params.bud_id)
          .transactions.unshift(newTransaction);

        organization
          .save()
          .then(organization =>
            res.json(organization.budgets.id(req.params.bud_id).transactions[0])
          )
          .catch(err => res.status(400).json({ err }));
      })
      .catch(err => res.status(400).json({ error: err }));
  }
);

// @route   PUT api/organization/budget/:bud_id/transactions/:tran_id
// @desc    Edit a transaction
// @access  Private/Admin
router.put(
  "/budget/:bud_id/transactions/:tran_id",
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
    Organization.findById(req.user.organization)
      .then(organization => {
        // Add to budgets array
        if (
          !organization.budgets
            .id(req.params.bud_id)
            .transactions.id(req.params.tran_id)
        ) {
          return res.status(404).json({ error: "Transaction does not exist" });
        }

        organization.budgets
          .id(req.params.bud_id)
          .transactions.id(req.params.tran_id).title = req.body.title;
        organization.budgets
          .id(req.params.bud_id)
          .transactions.id(req.params.tran_id).amount = req.body.amount;

        organization
          .save()
          .then(organization =>
            res.json(
              organization.budgets
                .id(req.params.bud_id)
                .transactions.id(req.params.tran_id)
            )
          )
          .catch(err => res.status(400).json({ err }));
      })
      .catch(err => res.status(400).json({ error: err }));
  }
);

// @route   DELETE api/organization/budget/:bud_id/transactions/:tran_id
// @desc    Delete transaction from a budget
// @access  Private/Admin
router.delete(
  "/budget/:bud_id/transactions/:tran_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Organization.findById(req.user.organization)
      .then(organization => {
        if (req.user.role !== "admin") {
          return res
            .status(400)
            .json({ unauthorized: "Must be an admin to access this page" });
        }

        if (
          !organization.budgets
            .id(req.params.bud_id)
            .transactions.id(req.params.tran_id)
        ) {
          return res.status(404).json({ error: "Transaction does not exist" });
        }

        // Splice out of array
        organization.budgets
          .id(req.params.bud_id)
          .transactions.pull({ _id: req.params.tran_id });

        // Save
        organization.save().then(organization => res.json({ success: true }));
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
