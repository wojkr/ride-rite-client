import { FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";

const ButtonWishlist = ({ isAdded = false }) => {
  return (
    <IconButton sx={{ color: "black" }}>
      {isAdded ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
    </IconButton>
  );
};

export default ButtonWishlist;
//     <Box m="20px 0 5px 0" display="flex" alignItems="center">
//   <Typography>
//     {isAdded ? "ADDED TO WISHLIST" : "ADD TO WISHLIST"}
//   </Typography>
// </Box>
