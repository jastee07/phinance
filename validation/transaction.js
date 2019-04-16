const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTransactionInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : "";
    data.amount = (!isEmpty(data.amount) || data.amount !== 0) ? data.amount : "";
    data.description = !isEmpty(data.description) ? data.description : "";
    data.date = !isEmpty(data.date) ? data.date : "";

    //Check if fields are empty
    if (Validator.isEmpty(data.title)) {
        errors.title = "Title field is required";
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = "Description field is required";
    }

    if (Validator.isEmpty(data.date)) {
        errors.date = "Date field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
