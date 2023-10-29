import {
  Box,
  Button,
  StepLabel,
  Stepper,
  Step,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { shades } from "../../theme";
import Shipping from "../checkout/Shipping";
import ContactForm from "../checkout/ContactForm";
import { loadStripe } from "@stripe/stripe-js";
import { serverUrl } from "../../serverUrl";
import Credentials from "./Credentials";

const stripePromise = loadStripe(
  "pk_test_51MrMGHBz2K77cEWJhJTJdxXznJ3ovLI6uL9GBCgaxl0bOzURA70QYlJCo2kcsZd4EnsB3Tf2fkikPmAUshgkyz9W00R6q4A7GX"
);
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

const checkoutSchema = [
  //  STEP ONE
  yup.object().shape({
    username: yup.string().required("Required"),
    password: yup.string().required("Required"),
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

const RegisterUser = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isNonMobile = useMediaQuery("(min-width:600px");
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (values, actions, errors) => {
    console.log(values, actions, errors);
    setActiveStep(activeStep + 1);

    if (isSecondStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      register(values);
    }
    actions.setTouched({});
  };

  const register = async (values) => {
    console.log(values);
    // const requestBody = {
    //   userName: values.firstName values.lastName.join(""),
    //   email: values.email,
    //   products: cart.map(({ id, count }) => ({
    //     id,
    //     count,
    //   })),
    // };
    // const stripe = await stripePromise;
    // const requestBody = {
    //   userName: [values.firstName, values.lastName].join(""),
    //   email: values.email,
    //   products: cart.map(({ id, count }) => ({
    //     id,
    //     count,
    //   })),
    // };
    // const response = await fetch(`${serverUrl}/api/orders`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(requestBody),
    // });
    // const session = await response.json();
    // await stripe.redirectToCheckout({ sessionId: session.id });
  };
  return (
    <Box width={isNonMobile ? "80%" : "95%"} m="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>
            Login <br></br>Credentials
          </StepLabel>
        </Step>
        <Step>
          <StepLabel>Details</StepLabel>
        </Step>
        {isNonMobile && (
          <Step>
            <StepLabel>
              Ready for<br></br> Shopping
            </StepLabel>
          </Step>
        )}
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
          validate={(values) => {
            const errors = {};

            if (!values.email) {
              errors.email = "required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
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
                errors.billingAddress.buildingNumber =
                  "Invalid building number";
              }
            }
            console.log(errors);
            return errors;
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              {/* FIRST STEP */}
              {isFirstStep && (
                <>
                  <Credentials
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    handleSubmit={handleSubmit}
                    setFieldValue={setFieldValue}
                  />
                  <ContactForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    handleSubmit={handleSubmit}
                    setFieldValue={setFieldValue}
                  />
                </>
              )}

              {/* SECOND STEP */}
              {isSecondStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  handleSubmit={handleSubmit}
                  setFieldValue={setFieldValue}
                />
              )}

              {/* NAVIGATION BUTTONS */}
              <Box display="flex" justifyContent="space-between" gap="50px">
                {isSecondStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[300],
                      boxShadow: "none",
                      color: "white",
                      borderRaddius: "none",
                      padding: "15px 40px ",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                {activeStep < 2 && (
                  <Button
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[500],
                      boxShadow: "none",
                      color: "white",
                      borderRaddius: "none",
                      padding: "15px 40px ",
                    }}
                  >
                    {isFirstStep ? "Next" : "Register"}
                  </Button>
                )}
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default RegisterUser;
