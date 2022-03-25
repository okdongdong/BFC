import React from "react";
import "./App.css";
import Router from "./routes";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router></Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
