import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedOut: (state) => {
      state.user = {};
      state.isLoggedIn = false;
    },
    setLoggedIn: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    setWishlist: (state, action) => {
      const itemId = action.payload.id;
      const wishlist = state.user.wishlist;
      const index = wishlist.findIndex((item) => item.id === itemId);
      if (index < 0) {
        wishlist.push(action.payload);
      } else {
        state.user.wishlist = wishlist.filter((item) => item.id !== itemId);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoggedOut, setLoggedIn, setWishlist } = userSlice.actions;

export default userSlice.reducer;
