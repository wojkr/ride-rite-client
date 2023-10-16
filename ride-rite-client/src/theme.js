import { createTheme } from "@mui/material/styles";

export const shades = {
  primary: {
    100: "#d0d0d0",
    200: "#a1a1a1",
    300: "#717171",
    400: "#424242",
    500: "#131313",
    600: "#0f0f0f",
    700: "#0b0b0b",
    800: "#080808",
    900: "#040404",
  },
  secondary: {
    100: "#fff1d0",
    200: "#fee3a1",
    300: "#fed471",
    400: "#fdc642",
    500: "#fdb813",
    600: "#ca930f",
    700: "#986e0b",
    800: "#654a08",
    900: "#332504",
  },
  neutral: {
    100: "#ccf0f8",
    200: "#99e1f1",
    300: "#66d2e9",
    400: "#33c3e2",
    500: "#00b4db",
    600: "#0090af",
    700: "#006c83",
    800: "#004858",
    900: "#00242c",
  },
};

export const theme = createTheme({
  palette: {
    primary: { main: shades.primary[500] },
    secondary: { main: shades.secondary[500] },
    neutral: {
      dark: shades.neutral[700],
      main: shades.neutral[500],
      light: shades.neutral[100],
    },
  },
  typography: {
    fontFamily: ["Fauna One", "sans-serif"].join(","),
    fontSize: 11,
    h1: {
      fontFamily: ["Cinzel", "sans-serif"].join(","),
      fontSize: 48,
    },
    h2: {
      fontFamily: ["Cinzel", "sans-serif"].join(","),
      fontSize: 36,
    },
    h3: {
      fontFamily: ["Cinzel", "sans-serif"].join(","),
      fontSize: 20,
    },
    h4: {
      fontFamily: ["Cinzel", "sans-serif"].join(","),
      fontSize: 14,
    },
  },
});
