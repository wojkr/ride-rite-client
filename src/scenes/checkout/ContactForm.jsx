import { Box, TextField, Typography } from "@mui/material";

const ContactForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
}) => {
  return (
    <Box m="30px 0">
      {/* CONTACT INFO */}

      <Typography sx={{ mb: "15px" }} fontSize="18px">
        Contact info
      </Typography>
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
        type="text"
        label="Phone Number"
        // inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.phoneNumber}
        name="phoneNumber"
        error={!!touched.phoneNumber && !!errors.phoneNumber}
        helperText={touched.phoneNumber && errors.phoneNumber}
        sx={{ gridColumn: "span 4" }}
      />
    </Box>
  );
};

export default ContactForm;
