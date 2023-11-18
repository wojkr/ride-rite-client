import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Item from "../../components/Item";
import { shades } from "../../theme";
import { useSelector } from "react-redux";
import ItemsContainer from "../../components/ItemsContainer";

const Wishlist = ({ wishlist }) => {
  const items = useSelector((state) => state.cart.items);
  const [formattedWishlist, setFormattedWishlist] = useState(wishlist);

  useEffect(() => {
    if (items.length > 0) {
      setFormattedWishlist(getFormattedWishlist());
    }
  }, [items]); // eslint-disable-next-line react-hooks/exhaustive-deps

  function getFormattedWishlist() {
    return wishlist.map((w) => items.find((i) => i.id == w.id));
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
          {formattedWishlist[0]?.attributes &&
            formattedWishlist.map((item) => (
              // <p>{item.id}</p>
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
