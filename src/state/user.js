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
  },
});

// Action creators are generated for each case reducer function
export const { setLoggedOut, setLoggedIn } = userSlice.actions;

export default userSlice.reducer;
