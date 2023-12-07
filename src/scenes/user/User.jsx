import { Box, Typography, Button, Divider } from "@mui/material";
import { shades } from "../../theme";
import { products } from "../../Model/menu";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import ButtonLogin from "../../components/ButtonLogin";
import ButtonRegister from "../../components/ButtonRegister";
import ButtonLogout from "../../components/ButtonLogout";
import FlashMessage from "../../components/FlashMessage";
import Orders from "./Orders";
import Wishlist from "./Wishlist";

const User = () => {
  const user = useSelector((state) => state.user.user, shallowEqual);
  const isLoggedIn = useSelector(
    (state) => state.user.isLoggedIn,
    shallowEqual
  );
  const wishlist = useSelector(
    (state) => state.user.user.wishlist,
    shallowEqual
  );
  const orders = useSelector((state) => state.user.user.orders, shallowEqual);
  const navigate = useNavigate();

  return (
    <>
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
          padding="120px 0"
          margin="0 auto"
          display="flex"
          flexDirection={"column"}
          justifyContent="space-evenly"
          alignItems="baseline"
        >
          <FlashMessage />
          <Typography
            variant="h2"
            fontWeight="bold"
            lineHeight="150%"
            color={shades.neutral[600]}
          >
            Hello{" "}
            {user?.username?.substring(0, 1).toUpperCase() +
              user?.username?.substring(1) || "Stranger"}
            !
          </Typography>
          <Typography
            variant="h3"
            lineHeight="150%"
            color={shades.neutral[600]}
          >
            {" "}
            Ready for a new bicycle adventure?
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
                Yes, I'm ready!
              </Button>
              <ButtonLogout />
            </>
          ) : (
            <>
              <ButtonLogin text="Yes, I have an account" />
              <ButtonRegister text="I don't have an account" />
            </>
          )}
        </Box>
      </Box>
      {isLoggedIn && orders && orders.length > 0 && (
        <>
          <Divider sx={{ borderColor: shades.neutral[600], width: "100%" }} />
          <Orders orders={orders} />
        </>
      )}
      {isLoggedIn && wishlist && wishlist.length > 0 && (
        <>
          <Divider sx={{ borderColor: shades.neutral[600], width: "100%" }} />
          <Wishlist wishlist={wishlist} />
        </>
      )}
    </>
  );
};

export default User;
