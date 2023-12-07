import React from "react";
import { shades } from "../../theme";
import { Box, Typography } from "@mui/material";

const Section = ({ title, text, idName }) => {
  return (
    <Box mt="50px" sx={{ scrollMarginTop: "60px" }} id={idName}>
      <Typography
        variant="h3"
        fontWeight="bold"
        lineHeight="225%"
        color={shades.neutral[600]}
      >
        {title}
      </Typography>
      <Typography lineHeight="150%" color={shades.neutral[800]}>
        {text}
      </Typography>
    </Box>
  );
};

export default Section;
