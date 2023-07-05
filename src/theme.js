import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shadows: [
    'none',
    'revert-to-scss',
  ],
  palette: {
    primary: {
      main: "#4361ee",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});
