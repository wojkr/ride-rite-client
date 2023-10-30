import * as yup from "yup";
const registerSchema = [
  //  STEP ONE
  yup.object().shape({
    username: yup.string().required("Required"),
    password: yup
      .string()
      .min(6, "The password is too short (min: 6)")
      .required("Required"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    email: yup.string().required("Required"),
    phoneNumber: yup.string().required("Required"),
  }),
  // STEP TWO
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("Required"),
      lastName: yup.string().required("Required"),
      country: yup.string().required("Required"),
      buildingNumber: yup.string().required("Required"),
      street1: yup.string().required("Required"),
      street2: yup.string(),
      city: yup.string().required("Required"),
      postCode: yup.string().required("Required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: () => yup.string().required("Required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: () => yup.string().required("Required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: () => yup.string().required("Required"),
      }),
      buildingNumber: yup.string().when("isSameAddress", {
        is: false,
        then: () => yup.string().required("Required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: () => yup.string().required("Required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: () => yup.string().required("Required"),
      }),
      postCode: yup.string().when("isSameAddress", {
        is: false,
        then: () => yup.string().required("Required"),
      }),
    }),
  }),
];

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    buildingNumber: "",
    street1: "",
    street2: "",
    city: "",
    postCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    buildingNumber: "",
    street1: "",
    street2: "",
    city: "",
    postCode: "",
  },
  username: "",
  password: "",
  passwordConfirmation: "",
  email: "",
  phoneNumber: "",
};

export { registerSchema, initialValues };
