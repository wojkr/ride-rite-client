import axios from "axios";
import {
  Box,
  Button,
  StepLabel,
  Stepper,
  Step,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import { shades } from "../../theme";
import Shipping from "../checkout/Shipping";
import ContactForm from "../checkout/ContactForm";
import { loadStripe } from "@stripe/stripe-js";
import Credentials from "./Credentials";
import { serverUrl } from "../../serverUrl";
import { useNavigate } from "react-router-dom";
import { user } from "../../Model/menu";
import { registerValidation } from "../../utils/registerValidation";
import { registerSchema, initialValues } from "../../Schemas/registerSchema";
import { useCookies } from "react-cookie";

const stripePromise = loadStripe(
  "pk_test_51MrMGHBz2K77cEWJhJTJdxXznJ3ovLI6uL9GBCgaxl0bOzURA70QYlJCo2kcsZd4EnsB3Tf2fkikPmAUshgkyz9W00R6q4A7GX"
);

const RegisterUser = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px");
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const [cookie, setCookie] = useCookies(["jwt_token"]);
  const saveJWT = (jwt) => {
    const expireDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    setCookie("jwt_token", jwt, {
      expires: expireDate,
      path: "/",
      secure: true,
    });
  };
  const saveUser = (user) => dispatch(setLoggedIn(user));

  const handleFormSubmit = async (values, actions, errors) => {
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

  useEffect(() => {
    if (isLoggedIn) navigate(user.link());
  }, [isLoggedIn]);

  const register = async (values) => {
    delete values.passwordConfirmation;
    const requestBody = {
      ...values,
    };

    await axios
      .post(`${serverUrl}/api/auth/local/register`, requestBody)
      .then((response) => {
        saveJWT(response.data.jwt);
        saveUser(response.data.user);
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
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
          validationSchema={registerSchema[activeStep]}
          validate={(values) => registerValidation(values, isFirstStep)}
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
