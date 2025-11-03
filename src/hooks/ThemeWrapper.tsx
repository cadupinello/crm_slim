import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";
import { DarkTheme, LightTheme } from "../theme";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  useEffect(() => {
    const storedMode = localStorage.getItem("mode");
    if (storedMode) {
      setMode(storedMode as "light" | "dark");
    }
  }, []);


  return (
    <ThemeProvider theme={mode === "light" ? LightTheme : DarkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
