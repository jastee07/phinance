const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateBudgetInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.amount = !isEmpty(data.amount) ? data.amount : "";
  data.revenue = !isEmpty(data.revenue) ? data.revenue : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.amount)) {
    errors.amount = "Amount field is required";
  }

  if (data.amount <= 0) {
    errors.amount = "Amount must be greater than 0";
  }

  if (Validator.isEmpty(data.revenue)) {
    errors.revenue = "Revenue field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
