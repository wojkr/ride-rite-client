import { Box } from "@mui/material";
import React from "react";

const ItemsContainer = ({ children }) => {
  return (
    <Box
      margin="0 auto"
      display="grid"
      gridTemplateColumns="repeat(auto-fill,300px)"
      justifyContent="space-around"
      rowGap="20px"
    >
      {children}
    </Box>
  );
};

export default ItemsContainer;
