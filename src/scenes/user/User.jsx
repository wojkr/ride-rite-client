import { Box, Typography, useMediaQuery, Button } from "@mui/material";
import { useState } from "react";
import { shades } from "../../theme";
import { user, home, products } from "../../Model/menu";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedOut } from "../../state/user";

const User = () => {
  const [email, setEmail] = useState("");
  const [cookie, removeCookie] = useCookies(["jwt_token"]);
  const { user: userState, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width:1200px");
  return (
    <Box
      id="User"
      style={{
        background: `linear-gradient(0deg, ${shades.neutral[100] + "00"}, ${
          shades.neutral[100]
        })`,
      }}
    >
      <Box
        width="80%"
        padding="80px 0"
        margin="0 auto"
        display="flex"
        flexDirection={isNonMobile ? "row" : "column"}
        justifyContent="space-evenly"
        alignItems="baseline"
        gap={isNonMobile ? "5rem" : "1rem"}
      >
        <Box flex="5" paddingLeft={isNonMobile && "10%"} width="80%">
          <Typography
            variant="h2"
            fontWeight="bold"
            lineHeight="150%"
            color={shades.neutral[600]}
          >
            Hello {userState.username || "Stranger"}!
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            lineHeight="150%"
            color={shades.neutral[600]}
          >
            {" "}
            Are you ready to get a new bicycle?
          </Typography>
          {isLoggedIn ? (
            <>
              <Button
                variant="contained"
                // href={user.register.link()}
                onClick={() => {
                  navigate(products.link());
                }}
                sx={{
                  display: "block",
                  marginTop: "1rem",
                  paddingX: "2rem",
                  backgroundColor: shades.neutral[600],
                  color: "white",
                  "&:hover": { backgroundColor: shades.neutral[700] },
                }}
              >
                Yes!
              </Button>
              <Button
                variant="contained"
                // href={user.register.link()}
                onClick={() => {
                  console.log(removeCookie("jwt_token"));
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
            </>
          ) : (
            <>
              <Button
                variant="contained"
                // href={user.register.link()}
                onClick={() => navigate(user.login.link())}
                sx={{
                  marginTop: "1rem",
                  backgroundColor: shades.secondary[400],
                  color: "black",
                  "&:hover": { backgroundColor: shades.secondary[300] },
                }}
              >
                Yes! I have an account
              </Button>
              <Button
                variant="contained"
                // href={user.register.link()}
                onClick={() => navigate(user.register.link())}
                sx={{
                  display: "block",
                  marginTop: "1rem",
                  backgroundColor: shades.neutral[600],
                  color: "white",
                  "&:hover": { backgroundColor: shades.neutral[700] },
                }}
              >
                I do not have an account
              </Button>
            </>
          )}
        </Box>
        <Box flex="7">
          <Typography
            color={shades.neutral[800]}
            lineHeight="225%"
          ></Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default User;
