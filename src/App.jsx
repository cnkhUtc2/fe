
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./components/Header/navBar";
import Home from "./Pages/Home";
import Donate from "./Pages/DonatePage";
import GiveBlood from "./Pages/GiveBlood";
import Training from "./Pages/Training";
import Volunteer from "./Pages/Volunteer";
import About from "./Pages/About";
import GetHelp from "./Pages/GetHelp";
import Profile from "./Pages/Profile";
import Account from "./Pages/Account";
import Dashboard from "./Pages/Dashboard";
import Footer from "./components/Footer/footer";
import Blog from "./Pages/Blog";
import Messenger from "./Pages/messenger/Messenger";
import Signin from "./Pages/sign-in/SignIn";
import { UserProvider } from "../UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/give-blood" element={<GiveBlood />} />
          <Route path="/training" element={<Training />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<GetHelp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account" element={<Account />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/messenger" element={<Messenger />} />
          
        </Routes>

        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
