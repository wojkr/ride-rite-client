import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLoggedOut } from "../state/user";
import { useNavigate } from "react-router-dom";
import { home } from "../Model/menu";
import { shades } from "../theme";
import { useCookies } from "react-cookie";
import { cookieName } from "../Model/cookies";
const ButtonLogout = () => {
  const [cookie, removeCookie] = useCookies([cookieName]); //do not remove cookie from this array!
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      onClick={() => {
        removeCookie(cookieName);
        dispatch(setLoggedOut());
        navigate(home.link());
      }}
      sx={{
        marginTop: "1rem",
        backgroundColor: shades.secondary[400],
        color: "black",
        "&:hover": { backgroundColor: shades.secondary[300] },
      }}
    >
      Logout
    </Button>
  );
};
export default ButtonLogout;
