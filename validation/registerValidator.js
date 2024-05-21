const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.verifyPassword = !isEmpty(data.verifyPassword)
    ? data.verifyPassword
    : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "firstName field is required";
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "lastName field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.verifyPassword)) {
    errors.lastName = "verifyPassword is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
