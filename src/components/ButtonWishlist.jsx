import { FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { cookieName } from "../Model/cookies";
import { shallowEqual, useSelector } from "react-redux";

async function updateWishlist(token, wishlist) {
  if (!!cookie[cookieName] && cookie[cookieName] != "undefined") {
    const url = `${serverUrl}/api/users/me?populate=wishlist&populate=billingAddress&populate=shippingAddress&populate=orders`;
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(setLoggedIn(response.data));
      })
      .catch((error) => {
        // Handle error.
        console.error("An error occurred:", error.response);
      });
  } else {
    console.warn("user not logged in!");
  }
}

const handleWishlistRequest = (id) => {
  console.info("REQ!!" + id);
};

const ButtonWishlist = ({ isAdded = false, backgroundColor = "", id }) => {
  const [cookie] = useCookies([cookieName]);
  const token = cookie[cookieName];
  const user = useSelector((state) => state.user.user, shallowEqual);
  console.log;

  return (
    <IconButton
      onClick={() => handleWishlistRequest(id)}
      sx={{
        color: "black",
        backgroundColor: backgroundColor,
        "&:hover": { backgroundColor: backgroundColor },
      }}
    >
      {isAdded ? <FavoriteOutlined /> : <FavoriteBorderOutlined />}
    </IconButton>
  );
};

export default ButtonWishlist;
