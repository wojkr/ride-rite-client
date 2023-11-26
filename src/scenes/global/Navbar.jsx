import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Badge, Box, IconButton, useMediaQuery } from "@mui/material";
import {
  PersonOutline,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import logoImg from "../../assets/logo300x94.webp";
import logoImgMini from "../../assets/logo100.webp";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state/cart";
import { setIsMenuOpen } from "../../state/menu";
import { home, user } from "../../Model/menu";

const Navbar = () => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { cart } = useSelector((state) => state.cart);
  return (
    <nav className="">
      <Box
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
            sx={{
              "&:hover": { cursor: "pointer" },
            }}
          >
            <Link to={home.link()}>
              <img
                src={isNonMobile ? logoImg : logoImgMini}
                alt="ride rite logo"
                height={isNonMobile ? "30px" : "28px"}
              />
            </Link>
          </Box>
          <Box
            className=""
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            columnGap={isNonMobile ? "20px" : "7px"}
            zIndex="2"
          >
            <IconButton sx={{ color: "black" }}>
              <SearchOutlined />
            </IconButton>
            <Link to={user.link()}>
              <IconButton sx={{ color: "black" }}>
                <PersonOutline />
              </IconButton>
            </Link>
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
            <IconButton
              onClick={() => dispatch(setIsMenuOpen())}
              sx={{ color: "black" }}
            >
              <MenuOutlined />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </nav>
  );
};
export default Navbar;
