import { useNavigate } from "react-router-dom";
import { shades } from "../theme";
import { user } from "../Model/menu.js";
import { Button } from "@mui/material";

const ButtonRegister = ({
  text = "Sign up",
  marginTop = "1rem",
  block = false,
}) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      onClick={() => navigate(user.register.link())}
      sx={{
        display: "block",
        marginTop: marginTop,
        width: block ? "100%" : "auto",
        backgroundColor: shades.neutral[600],
        color: "white",
        "&:hover": { backgroundColor: shades.neutral[700] },
      }}
    >
      {text}
    </Button>
  );
};
export default ButtonRegister;
