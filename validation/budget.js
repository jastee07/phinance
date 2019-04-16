const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateBudgetInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.amount = (!isEmpty(data.amount) || data.amount !== 0) ? data.amount : "";

  //Check if fields are empty
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
