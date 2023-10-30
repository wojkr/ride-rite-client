import axios from "axios";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import { shades } from "../../theme";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedIn } from "../../state/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { user } from "../../Model/menu";
import { loginValidation } from "../../utils/loginValidation";

const initialValues = {
  email: "",
  password: "",
};

const User = () => {
  const isNonMobile = useMediaQuery("(min-width:1200px");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: userState, isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoggedIn) navigate(user.link());
  }, [isLoggedIn]);

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

  const handleFormSubmit = async (values) => {
    console.log(values);
    // Request API.
    const user = await axios
      .post("http://localhost:1337/api/auth/local", {
        identifier: values.email,
        password: values.password,
      })
      .then((response) => {
        saveJWT(response.data.jwt);
        saveUser(response.data.user);
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
      });
  };

  return (
    <Box
      id="User"
      style={{
        background: `linear-gradient(0deg, ${shades.neutral[100] + "00"}, ${
          shades.neutral[100]
        })`,
      }}
    >
      <Box
        width="80%"
        padding="80px 0"
        margin="0 auto"
        display="flex"
        flexDirection={isNonMobile ? "row" : "column"}
        justifyContent="space-evenly"
        alignItems="baseline"
        gap={isNonMobile ? "5rem" : "1rem"}
      >
        <Box flex="5" paddingLeft={isNonMobile && "10%"} width="80%">
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
          >
            {" "}
            To be ready for shopping!
          </Typography>
        </Box>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
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
            </form>
          )}
        </Formik>
      </Box>
      <Divider sx={{ background: shades.neutral[300] }} />
    </Box>
  );
};

export default User;
