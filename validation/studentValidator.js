const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateStudentInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.subjectName = !isEmpty(data.subjectName) ? data.subjectName : "";
  data.mark = !isEmpty(data.mark) ? data.mark.toString() : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (Validator.isEmpty(data.subjectName)) {
    errors.subjectName = "Subject field is required";
  }
  if (Validator.isEmpty(data.mark)) {
    errors.mark = "Mark field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};