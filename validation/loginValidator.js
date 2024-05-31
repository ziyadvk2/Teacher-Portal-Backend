import Validator from "validator";
import isEmpty from "is-empty";

const validateLoginInput=(data)=> {
  let errors = {};

  // Ensure string values for validation
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Validate email
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Validate password
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  } else if (!Validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password must be at least 6 characters long";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
export default validateLoginInput;