import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ResponsiveAppBar from "./components/Header/navBar";
import Footer from "./components/Footer/Footer";
import { UserProvider } from "../UserContext";
import Navigation from "./Navigation";

function App() {
  return (
    <Router>
      <UserProvider>
        <ResponsiveAppBar />
        <Navigation />
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
