import axios from "axios";
import {
  Box,
  Button,
  StepLabel,
  Stepper,
  Step,
  useMediaQuery,
  Typography,
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
import { setLoggedIn } from "../../state/user";
import { cookieName } from "../../Model/cookies";
import FlashMessage from "../../components/FlashMessage";
import Loader from "../global/Loader";
import { defaultError, spinningUpError } from "../../Model/error";
import MUiAlert from "../../Model/MUiAlert";

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

  const [cookie, setCookie] = useCookies([cookieName]);
  const saveJWT = (jwt) => {
    const expireDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    setCookie(cookieName, jwt, {
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
  }, []);

  const register = async (values) => {
    let message, severity;
    delete values.passwordConfirmation;
    const requestBody = {
      ...values,
    };
    const url = `${serverUrl}/api/auth/local/register`;
    await axios
      .post(url, requestBody)
      .then((response) => {
        saveUser(response.data.user);
        saveJWT(response.data.jwt);
        severity = MUiAlert.success;
        message = "You have successfully signed up!";
        navigate(`${user.link()}?severity=${severity}&message=${message}`);
      })
      .catch((error) => {
        let message, severity;
        if (error.code == "ERR_NETWORK") {
          severity = MUiAlert.warning;
          message = `${spinningUpError.title} ${spinningUpError.message}`;
        } else {
          severity = MUiAlert.error;
          message =
            error?.response?.data?.error?.message || defaultError.message;
        }
        setActiveStep(0);
        navigate(`?severity=${severity}&message=${message}`);
      });
  };
  return (
    <Box width={isNonMobile ? "80%" : "95%"} m="100px auto">
      <Typography
        variant="h1"
        fontWeight="bold"
        lineHeight="150%"
        color={shades.neutral[600]}
      >
        Sign Up
      </Typography>
      <Typography variant="h4" lineHeight="150%" color={shades.neutral[700]}>
        Unlock Faster Ordering, Share Feedback, and Build Your Wishlist! Create
        Your Account Today.
      </Typography>
      <FlashMessage />
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
      {activeStep > 1 && <Loader noMargin />}
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
