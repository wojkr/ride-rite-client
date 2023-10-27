import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  Close as CloseIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../../state/cart";
import { useNavigate } from "react-router-dom";
import { Collapse } from "@mui/material";
import { useEffect, useRef } from "react";
import { serverUrl } from "../../serverUrl";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, isCartOpen } = useSelector((state) => state.cart);

  const cartRef = useRef(null);

  useEffect(() => {
    const handleClickOutsideCart = (e) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(e.target) &&
        isCartOpen
      ) {
        dispatch(setIsCartOpen(false));
      }
    };
    document.addEventListener("mousedown", handleClickOutsideCart);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideCart);
    };
  }, [cartRef, isCartOpen]);

  const totalPrice = cart?.reduce((total, item) => {
    return total + item?.attributes?.price * item?.count;
  }, 0);
  return (
    //   overlay
    <Collapse orientation="horizontal" in={isCartOpen}>
      <Box
        className="2"
        position="fixed"
        top="0"
        left="0"
        width="100%"
        //   width={isCartOpen ? "500px" : "0"}
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
          ref={cartRef}
          className="cart-bg"
        >
          <Box overflow="auto" height="100%">
            {/*header*/}
            <FlexBox mb="15px">
              <Typography flexgrow={1} variant="h3">
                Shopping bag ({cart?.length || 0})
              </Typography>
              <IconButton onClick={() => dispatch(setIsCartOpen())}>
                <CloseIcon />
              </IconButton>
            </FlexBox>
            {/* CART LIST */}
            <Box>
              {cart?.map((item) => {
                return (
                  <Box
                    key={`${item?.attributes?.name}-${Math.random()}-${
                      item?.id
                    }`}
                  >
                    <FlexBox p="15px 0">
                      {/* ITEM IMAGE */}
                      <Box flex="1 1 40%">
                        <img
                          alt={item?.name}
                          width="123px"
                          height="164px"
                          style={{
                            cursor: "pointer",
                            objectFit: "cover",
                            backgroundColor: shades.neutral[200],
                          }}
                          src={`${serverUrl}${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                        />
                      </Box>

                      {/* ITEM NAME + REMOVE ICON */}
                      <Box flex="1 1 60%">
                        <FlexBox mb="5px">
                          <Typography fontWeight="bold">
                            {item?.attributes.name}
                            <IconButton
                              onClick={() =>
                                dispatch(removeFromCart({ id: item?.id }))
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Typography>
                        </FlexBox>
                        <Typography variant="subtitle2" mb="1rem">
                          {item?.attributes.shortDescription}
                        </Typography>

                        {/* INCREACE OR DECREACE ITEMS NUMBERS */}
                        <FlexBox width="100%">
                          <Box
                            display="flex"
                            alignItems="center"
                            border={`1.5px solid ${shades.neutral[500]}`}
                          >
                            <IconButton
                              onClick={() =>
                                dispatch(decreaseCount({ id: item?.id }))
                              }
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Typography>{item?.count}</Typography>
                            <IconButton
                              onClick={() =>
                                dispatch(increaseCount({ id: item?.id }))
                              }
                            >
                              <AddIcon />
                            </IconButton>
                          </Box>
                          {/* PRICE */}
                          <Typography fontWeight="bold">
                            £{item?.attributes?.price}
                          </Typography>
                        </FlexBox>
                      </Box>
                    </FlexBox>
                    <Divider sx={{ background: shades.neutral[300] }} />
                  </Box>
                );
              })}
            </Box>
            {/* ACTIONS */}
            {cart?.length !== 0 && (
              <Box m="20px 0">
                <FlexBox m="20px 0">
                  <Typography fontWeight="bold">SUBTOTAL:</Typography>
                  <Typography fontWeight="bold">
                    {parseInt(totalPrice * 100) / 100 || 0}
                  </Typography>
                </FlexBox>
                <Button
                  sx={{
                    backgroundColor: shades.primary[500],
                    color: "white",
                    borderRadius: 0,
                    minWidth: "100%",
                    padding: "20px 40px",
                    m: "20px 0",
                    "&:hover": {
                      backgroundColor: shades.secondary[500],
                      color: shades.primary[800],
                    },
                  }}
                  onClick={() => {
                    navigate("/checkout");
                    dispatch(setIsCartOpen());
                  }}
                >
                  CHECKOUT
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Collapse>
  );
};

export default CartMenu;
