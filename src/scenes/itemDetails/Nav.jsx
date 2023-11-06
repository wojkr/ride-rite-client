import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = ({ itemId, lastItemId }) => {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      mb="40px"
      flexWrap="wrap"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography>
        <Link to="/">Home</Link>
        /Item
      </Typography>
      <Box>
        {itemId > 1 && (
          <Button onClick={() => navigate(`/item/${Number(itemId) - 1}`)}>
            Prev
          </Button>
        )}
        {itemId != lastItemId && (
          <Button onClick={() => navigate(`/item/${Number(itemId) + 1}`)}>
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Nav;
