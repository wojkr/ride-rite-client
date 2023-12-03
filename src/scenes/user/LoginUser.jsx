import axios from "axios";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import { shades } from "../../theme";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedIn } from "../../state/user";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { user } from "../../Model/menu";
import { loginValidation } from "../../utils/loginValidation";
import ButtonRegister from "../../components/ButtonRegister";
import { cookieName } from "../../Model/cookies";
import { serverUrl } from "../../serverUrl";
import LoaderStyled from "../../components/LoaderStyled";
import FlashMessage, { getParams } from "../../components/FlashMessage";
import { defaultError, spinningUpError } from "../../Model/error";
import MUiAlert from "../../Model/MUiAlert";
const initialValues = {
  email: "",
  password: "",
};

const User = () => {
  const isNonMobile = useMediaQuery("(min-width:1200px");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.user);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isLoggedIn) navigate(user.link());
  }, []);

  const [cookie, setCookie] = useCookies([cookieName]);
  const saveJWT = (jwt) => {
    const expireDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    setCookie(cookieName, jwt, {
      expires: expireDate,
    });
  };
  const saveUser = (user) => dispatch(setLoggedIn(user));

  const handleFormSubmit = async (values) => {
    if (isSubmitted) return;
    setIsSubmitted(true);
    // Request API.
    const url = `${serverUrl}/api/auth/local?populate=wishlist&populate=billingAddress&populate=shippingAddress&populate=orders`;
    axios
      .post(url, {
        identifier: values.email,
        password: values.password,
      })
      .then((response) => {
        saveUser(response.data.user);
        saveJWT(response.data.jwt);
        const message = "Welcome back! You're now logged in.";
        const severity = "success";
        navigate(`${user.link()}?severity=${severity}&message=${message}`);
      })
      .catch((error) => {
        let message, severity;
        //server spins up
        if (error.code == "ERR_NETWORK") {
          severity = MUiAlert.warning;
          message = `${spinningUpError.title} ${spinningUpError.message}`;
          navigate(
            `${user.login.link()}?severity=${severity}&message=${message}`
          );
        } else {
          //other error
          severity = MUiAlert.error;
          message = `${
            error?.response?.data?.error?.message || defaultError.message
          }`;
          navigate(
            `${user.login.link()}?severity=${severity}&message=${message}`
          );
        }
      })
      .finally(() => setIsSubmitted(false));
  };

  return (
    <Box
      id="User"
      padding="80px 0"
      style={{
        background: `linear-gradient(0deg, ${shades.neutral[100] + "00"}, ${
          shades.neutral[100]
        })`,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h2"
          fontWeight="bold"
          lineHeight="150%"
          color={shades.neutral[600]}
        >
          Log in
        </Typography>
        <Typography
          variant="h3"
          fontWeight="bold"
          lineHeight="150%"
          color={shades.neutral[600]}
          mb={getParams(location.search).severity ? "15px" : "78px"}
        >
          and get ready to shop!
        </Typography>
        <Box my="10px">
          <FlashMessage />
        </Box>
        <Typography sx={{ my: "15px" }} fontSize="18px">
          Login Credentials
        </Typography>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validate={(values) => loginValidation(values)}
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
              <TextField
                disabled={isSubmitted}
                fullWidth
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4", marginBottom: "15px" }}
              />
              <TextField
                disabled={isSubmitted}
                fullWidth
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4", marginBottom: "15px" }}
              />
              {!isSubmitted ? (
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
                  Log in
                </Button>
              ) : (
                <LoaderStyled noMargin={true} size="55px" />
              )}
            </form>
          )}
        </Formik>
        <Box
          display="flex"
          flexDirection={isNonMobile ? "row" : "column"}
          justifyContent="center"
          alignItems="center"
          marginTop="2rem"
        >
          <Typography variant="h6" paddingX="0.5rem">
            Dont have an account?
          </Typography>
          <ButtonRegister marginTop={isNonMobile ? 0 : "0.5rem"} />
        </Box>
      </Container>
    </Box>
  );
};

export default User;
