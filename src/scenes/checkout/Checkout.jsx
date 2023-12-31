import { Box, Button, StepLabel, Stepper, Step } from "@mui/material";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { shades } from "../../theme";
import Shipping from "./Shipping";
import ContactForm from "./ContactForm";
import { loadStripe } from "@stripe/stripe-js";
import { serverUrl } from "../../serverUrl";
import { checkoutSchema, userValues } from "../../Schemas/checkoutSchema";
import { useNavigate } from "react-router-dom";
import { home } from "../../Model/menu";

const stripePromise = loadStripe(
  "pk_test_51MrMGHBz2K77cEWJhJTJdxXznJ3ovLI6uL9GBCgaxl0bOzURA70QYlJCo2kcsZd4EnsB3Tf2fkikPmAUshgkyz9W00R6q4A7GX"
);

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (values, actions) => {
    if (cart.length < 1) navigate(home.link());
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
      fullName: `${values.billingAddress.firstName} ${values.billingAddress.lastName}`,
      email: values.email,
      userId: user?.id,
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
  //redirection when carts empty
  useEffect(() => {
    if (cart.length < 1) {
      navigate(home.link());
    }
  }, [cart]);
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
          initialValues={userValues(user)}
          enableReinitialize={true}
          validationSchema={checkoutSchema[activeStep]}
          validate={(values) => {
            const errors = {};

            if (!values.billingAddress.buildingNumber) {
              errors.billingAddress = {};
              errors.billingAddress.buildingNumber = "Required";
            } else if (
              !/^[0-9\s()\/+=]+$/.test(values.billingAddress.buildingNumber)
            ) {
              errors.billingAddress = {};
              errors.billingAddress.buildingNumber = "Invalid building number";
            }
            if (!isFirstStep) {
              // SECOND STEP
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }

              if (!values.phoneNumber) {
                errors.phoneNumber = "Required";
              } else if (!/^[0-9\s()\/+=]+$/.test(values.phoneNumber)) {
                errors.phoneNumber = "Invalid phone number";
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
