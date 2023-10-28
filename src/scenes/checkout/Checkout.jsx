import { Box, Button, StepLabel, Stepper, Step } from "@mui/material";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { shades } from "../../theme";
import Shipping from "./Shipping";
import ContactForm from "./ContactForm";
import { loadStripe } from "@stripe/stripe-js";
import { serverUrl } from "../../serverUrl";

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
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  //  STEP ONE
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      buildingNumber: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      postCode: yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: () => yup.string().required("required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: () => yup.string().required("required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: () => yup.string().required("required"),
      }),
      buildingNumber: yup.string().when("isSameAddress", {
        is: false,
        then: () => yup.string().required("required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: () => yup.string().required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: () => yup.string().required("required"),
      }),
      postCode: yup.string().when("isSameAddress", {
        is: false,
        then: () => yup.string().required("required"),
      }),
    }),
  }),

  //  STEP TWO
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      makePayment(values);
    }
    actions.setTouched({});
  };

  const makePayment = async (values) => {
    const stripe = await stripePromise;
    const requestBody = {
      userName: [values.firstName, values.lastName].join(""),
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
    };
    const response = await fetch(`${serverUrl}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const session = await response.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <Box width="80%" m="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Contact</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
          validate={(values) => {
            const errors = {};

            if (!isFirstStep) {
              // SECOND STEP
              if (!values.email) {
                errors.email = "required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }

              if (!values.phoneNumber) {
                errors.phoneNumber = "required";
              } else if (!/^[0-9\s()\/+=]+$/.test(values.phoneNumber)) {
                errors.phoneNumber = "Invalid Phone Number";
              }
            }
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

              {/* SECOND STEP */}
              {isSecondStep && (
                <ContactForm
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
                    {isFirstStep ? "Next" : "Place Order"}
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

export default Checkout;
