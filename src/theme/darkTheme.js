// theme/darkTheme.js
import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121b22",
      paper: "#1e2a32",
    },
    primary: {
      main: "#008f76",
    },
    secondary: {
      main: "#202c33",
    },
    text: {
      primary: "#e9edef",
      secondary: "#8696a0",
    },
  },
  typography: {
    fontFamily: `'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
  },
});

export default darkTheme;
