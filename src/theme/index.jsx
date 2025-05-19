import React, { useMemo, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import lightTheme from "./lightTheme";
import darkTheme from "./darkTheme";
import ColorModeContext from "./ColorModeContext";

export const ThemeWrapper = ({ children }) => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(
    () => (mode === "light" ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
