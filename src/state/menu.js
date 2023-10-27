import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuOpen: false,
};

export const menuSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setIsMenuOpen: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsMenuOpen } = menuSlice.actions;

export default menuSlice.reducer;
