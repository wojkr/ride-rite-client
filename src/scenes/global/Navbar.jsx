import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton, Typography } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  return (
    <nav className="">
      <Box
        className=""
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        minHeight="60px"
        backgroundColor={shades.neutral[100] + "F0"}
        position="fixed"
        top="0"
        left="0"
        zIndex="1"
      >
        <Box
          className=""
          width="80%"
          // margin="auto"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            className=""
            onClick={() => navigate("/")}
            sx={{
              "&:hover": { cursor: "pointer" },
            }}
            color={shades.secondary[600]}
          >
            <Typography
              variant="h2"
              sx={{ textShadow: "-1px 0px 1px #131313" }}
            >
              RIDE RITE
            </Typography>
          </Box>
          <Box
            className=""
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            columnGap="20px"
            zIndex="2"
          >
            <IconButton sx={{ color: "black" }}>
              <SearchOutlined />
            </IconButton>
            <IconButton sx={{ color: "black" }}>
              <PersonOutline />
            </IconButton>
            <Badge
              badgeContent={cart.length}
              color="secondary"
              invisible={cart.length === 0}
              sx={{
                ".MuiBadge-badge": {
                  right: 5,
                  top: 5,
                  padding: "0 4px",
                  height: "14px",
                  minWidth: "13px",
                },
              }}
            >
              <IconButton
                onClick={() => dispatch(setIsCartOpen())}
                sx={{ color: "black" }}
              >
                <ShoppingBagOutlined />
              </IconButton>
            </Badge>
            <IconButton sx={{ color: "black" }}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </nav>
  );
};
export default Navbar;
