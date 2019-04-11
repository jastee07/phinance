const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateBudgetInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (data.amount <= 0) {
    errors.amount = "Amount must be greater than 0";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
