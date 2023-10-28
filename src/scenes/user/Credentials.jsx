import { Box, TextField, Typography } from "@mui/material";

const Credentials = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
}) => {
  return (
    <Box m="30px 0">
      {/* CONTACT INFO */}

      <Typography sx={{ mb: "15px" }} fontSize="18px">
        Login Credentials
      </Typography>
      <TextField
        fullWidth
        type="text"
        label="Username"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.username}
        name="username"
        error={!!touched.username && !!errors.username}
        helperText={touched.username && errors.username}
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
        error={!!touched.password && !!errors.password}
        helperText={touched.password && errors.password}
        sx={{ gridColumn: "span 4", marginBottom: "15px" }}
      />
      <TextField
        fullWidth
        type="password"
        label="Password Confirmation"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.passwordConfirmation}
        name="passwordConfirmation"
        error={!!touched.passwordConfirmation && !!errors.passwordConfirmation}
        helperText={touched.passwordConfirmation && errors.passwordConfirmation}
        sx={{ gridColumn: "span 4" }}
      />
    </Box>
  );
};

export default Credentials;
