import React from "react";
import "./App.css";
import Router from "./routes";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router></Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
