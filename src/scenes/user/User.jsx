import { Box, Typography, useMediaQuery, Button } from "@mui/material";
import { shades } from "../../theme";
import { products } from "../../Model/menu";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ButtonLogin from "../../components/ButtonLogin";
import ButtonRegister from "../../components/ButtonRegister";
import ButtonLogout from "../../components/ButtonLogout";

const User = () => {
  const { user: userState, isLoggedIn } = useSelector((state) => state.user);
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
              <ButtonLogout />
            </>
          ) : (
            <>
              <ButtonLogin text="Yes! I have an account" />
              <ButtonRegister text="I do not have an account" />
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
