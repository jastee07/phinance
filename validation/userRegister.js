const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateUserRegisterInput(data) {
  let userErrors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    userErrors.firstName = "First Name must be between 2 and 30 characters.";
  }

  if (Validator.isEmpty(data.firstName)) {
    userErrors.firstName = "First Name is required";
  }

  if (!Validator.isLength(data.lastName, { min: 3, max: 30 })) {
    userErrors.lastName = "Last Name must be greater than 3 characters";
  }

  if (Validator.isEmpty(data.lastName)) {
    userErrors.lastName = "Last Name is required";
  }

  if (Validator.isEmpty(data.email)) {
    userErrors.email = "Email is required";
  }

  if (!Validator.isEmail(data.email)) {
    userErrors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    userErrors.password = "Password is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    userErrors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    userErrors.password2 = "Confirm Password is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    userErrors.password2 = "Passwords must match.";
  }

  return {
    userErrors,
    isUserValid: isEmpty(userErrors)
  };
};
