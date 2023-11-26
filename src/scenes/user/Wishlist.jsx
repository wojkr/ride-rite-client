import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Item from "../../components/Item";
import { shades } from "../../theme";
import { shallowEqual, useSelector } from "react-redux";
import ItemsContainer from "../../components/ItemsContainer";

const Wishlist = ({ wishlist = false }) => {
  console.log("Wishlist");
  const items = useSelector((state) => state.cart.items, shallowEqual);

  const formattedWishlist = getFormattedWishlist();
  function getFormattedWishlist() {
    if (wishlist && wishlist?.length && items?.length > 0) {
      const newW = wishlist?.map((w) => items.find((i) => i.id == w.id));
      return newW;
    } else {
      return false;
    }
  }
  return (
    <Container maxWidth="md">
      <Box mb="20px">
        <Typography
          variant="h3"
          fontWeight="bold"
          lineHeight="150%"
          color={shades.neutral[600]}
          marginTop="80px"
          marginBottom="20px"
        >
          Your Wishlist:
        </Typography>
        <ItemsContainer>
          {formattedWishlist &&
            formattedWishlist.map((item) => (
              <Item
                key={`${item.attributes.name}-${item.id}`}
                item={item}
                width="300px"
              />
            ))}
        </ItemsContainer>
      </Box>
    </Container>
  );
};

export default Wishlist;
