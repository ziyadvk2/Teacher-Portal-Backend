import Validator from "validator";
import isEmpty from "is-empty";

const validateRegisterInput=(data)=> {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.verifyPassword = !isEmpty(data.verifyPassword) ? data.verifyPassword : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "FirstName field is required";
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "LastName field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  } else {
    if (!Validator.isLength(data.password, { min: 6 })) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
      errors.password = "Password must contain at least one special character";
    }
  }

  if (Validator.isEmpty(data.verifyPassword)) {
    errors.verifyPassword = "Verify Password field is required";
  } else if (data.password !== data.verifyPassword) {
    errors.verifyPassword = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
export default validateRegisterInput;
