import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { shades } from "../theme";
import { home } from "../Model/menu";

const ButtonHome = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      onClick={() => navigate(home.link())}
      sx={{
        backgroundColor: shades.primary[400],
        color: "white",
        "&:hover": { backgroundColor: shades.primary[500] },
      }}
    >
      Go to Homepage
    </Button>
  );
};

export default ButtonHome;
