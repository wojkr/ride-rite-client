import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Close as CloseIcon } from "@mui/icons-material";
import styled from "@emotion/styled";
import { shades, theme } from "../../theme";
import { setIsMenuOpen } from "../../state/menu";
import { Link } from "react-router-dom";
import { Collapse } from "@mui/material";
import { useEffect, useRef } from "react";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Menu = () => {
  const MenuLink = styled(Link)({
    display: "block",
    padding: "0.5rem 0",
    textDecoration: "none",
    fontSize: 32,
    color: theme.palette.neutral.dark,
    fontFamily: theme.typography.h4.fontFamily,
  });

  const dispatch = useDispatch();
  const { isMenuOpen } = useSelector((state) => state.menu);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutsideMenu = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        isMenuOpen
      ) {
        dispatch(setIsMenuOpen(false));
      }
    };
    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, [menuRef, isMenuOpen]);

  return (
    //   overlay
    <Collapse orientation="horizontal" in={isMenuOpen}>
      <Box
        className="2"
        position="fixed"
        top="0"
        left="0"
        width="100%"
        //   width={isMenuOpen ? "500px" : "0"}
        height="100%"
        padding="20px"
        zIndex="10"
        backgroundColor="#01010155"
        overflow="auto"
      >
        {/* modal */}
        <Box
          position="fixed"
          top="0"
          right="0"
          width="max(400px,30%)"
          //   width={isCartOpen ? "500px" : "0"}
          height="100%"
          padding="30px"
          zIndex="100"
          backgroundColor={shades.neutral[100]}
          ref={menuRef}
        >
          <Box overflow="auto" height="100%">
            {/*header*/}
            <FlexBox flexDirection="row-reverse" mb="15px">
              <IconButton onClick={() => dispatch(setIsMenuOpen())}>
                <CloseIcon />
              </IconButton>
            </FlexBox>
            <Box>
              <MenuLink
                to="/#Home"
                onClick={() => dispatch(setIsMenuOpen(false))}
              >
                Home
              </MenuLink>
              <Divider sx={{ background: shades.neutral[300] }} />

              <MenuLink
                to="/#About"
                onClick={() => dispatch(setIsMenuOpen(false))}
              >
                About Us
              </MenuLink>
              <Divider sx={{ background: shades.neutral[300] }} />
              <MenuLink
                to="/#Products"
                onClick={() => dispatch(setIsMenuOpen(false))}
              >
                Products
              </MenuLink>
              <Divider sx={{ background: shades.neutral[300] }} />
              <MenuLink
                to="/#Subscribe"
                onClick={() => dispatch(setIsMenuOpen(false))}
              >
                Subscribe
              </MenuLink>
              <Divider sx={{ background: shades.neutral[300] }} />
              <MenuLink
                to="/OurStores"
                onClick={() => dispatch(setIsMenuOpen(false))}
              >
                Our Stores
              </MenuLink>
            </Box>
          </Box>
        </Box>
      </Box>
    </Collapse>
  );
};

export default Menu;
