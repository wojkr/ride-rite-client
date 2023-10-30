export const registerValidation = (values, isFirstStep) => {
  const errors = {};

  if (!values.email) {
    errors.email = "required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = "Required";
  } else if (!/^[0-9\s()\/+-=]+$/.test(values.phoneNumber)) {
    errors.phoneNumber = "Invalid phone number";
  }
  if (!isFirstStep) {
    if (!values.billingAddress.buildingNumber) {
      errors.billingAddress = {};
      errors.billingAddress.buildingNumber = "Required";
    } else if (
      !/^[0-9\s()\/+-=]+$/.test(values.billingAddress.buildingNumber)
    ) {
      errors.billingAddress = {};
      errors.billingAddress.buildingNumber = "Invalid building number";
    }
  }
  return errors;
};
