import { FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { useCookies } from "react-cookie";
import { cookieName } from "../Model/cookies";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../serverUrl";
import { setWishlist } from "../state/user";

const ButtonWishlist = ({ isAdded = false, backgroundColor = "", id }) => {
  const [cookie] = useCookies([cookieName]);
  const token = cookie[cookieName];
  const user = useSelector((state) => state.user.user, shallowEqual);
  const wishlist = useSelector((state) => state.user.user.wishlist);
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const itemId = parseInt(id);
  let wishlistIds = wishlist.map((i) => i.id);
  const handleWishlistRequest = async (itemId) => {
    if (wishlistIds.includes(itemId)) {
      //remove item
      const index = wishlistIds.indexOf(itemId);
      wishlistIds.splice(index, 1);
    } else {
      //add
      wishlistIds.push(itemId);
    }
    updateUserData(user.id, token, wishlistIds);
  };

  const updateUserData = async (userId, token, wishlistIdArray) => {
    try {
      const response = await axios.put(
        `${serverUrl}/api/users/${userId}`,
        {
          updateWishlist: {
            wishlist: wishlistIdArray,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const item = items.find((item) => item.id == itemId);
      dispatch(setWishlist(item));
      return response.data;
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  };

  return (
    <IconButton
      onClick={() => handleWishlistRequest(itemId)}
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
