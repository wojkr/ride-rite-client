import { useNavigate } from "react-router-dom";
import { user } from "../Model/menu";
import { shades } from "../theme";
import { Button } from "@mui/material";

const ButtonLogin = ({ text = "Log in" }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      onClick={() => navigate(user.login.link())}
      sx={{
        marginTop: "1rem",
        backgroundColor: shades.secondary[400],
        color: "black",
        "&:hover": { backgroundColor: shades.secondary[300] },
      }}
    >
      {text}
    </Button>
  );
};

export default ButtonLogin;
