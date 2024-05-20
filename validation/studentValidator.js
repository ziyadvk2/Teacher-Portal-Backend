const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateStudentInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.subjectName = !isEmpty(data.subjectName) ? data.subjectName : "";
  data.mark = !isEmpty(data.mark) ? data.mark : "";

  if (Validator.isEmpty(data.name)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.subjectName)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.mark)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};