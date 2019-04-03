const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateOrgRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";

  if (!Validator.isLength(data.name, { min: 2, max: 50 })) {
    errors.name = "Organization name must be between 2 and 50 characters.";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Organization name is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
