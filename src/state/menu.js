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
    setMenuClosed: (state) => {
      state.isMenuOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsMenuOpen, setMenuClosed } = menuSlice.actions;

export default menuSlice.reducer;
