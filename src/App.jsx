import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./components/Header/navBar";
import Home from "./Pages/Home";
import GiveBlood from "./Pages/GiveBlood";
import Training from "./Pages/Training";
import Volunteer from "./Pages/Volunteer";
import About from "./Pages/About";
import GetHelp from "./Pages/getHelp/GetHelp";
import Profile from "./Pages/Profile";
import Account from "./Pages/Account";
import Dashboard from "./Pages/Dashboard";
import Footer from "./components/Footer/footer";
import Blog from "./Pages/Blog";
import Messenger from "./Pages/messenger/Messenger";
import Signin from "./Pages/sign-in/SignIn";
import { UserProvider } from "../UserContext";
import RegisterPage from "./Pages/sign-in/RegisterPage";
import Post from "./Pages/Post";
import DonatePanel from "./Pages/donate/DonatePanel";
import PaySuccess from "./Pages/donate/PaySuccess";
import PayFail from "./Pages/donate/PayFail";

function App() {
  return (
    <Router>
      <UserProvider>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/donate" element={<DonatePanel />} />
          <Route path="/payment-success" element={<PaySuccess />} />
          <Route path="/payment-fail" element={<PayFail />} />
          <Route path="/give-blood" element={<GiveBlood />} />
          <Route path="/training" element={<Training />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<GetHelp />} />
          <Route path="/post" element={<Post />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account" element={<Account />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
