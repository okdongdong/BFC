import React from "react";
import "./App.css";
import Signup from "./pages/Accounts/Signup";
import Router from "./routes";

function App() {
  return (
    <div className="App">
      <Signup></Signup>
      <Router></Router>
    </div>
  );
}

export default App;
