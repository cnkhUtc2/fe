import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./components/Header/navBar";
import Home from "./Pages/Home";
import Training from "./Pages/Training";
import Volunteer from "./Pages/Volunteer";
import About from "./Pages/About";
import GetHelp from "./Pages/getHelp/GetHelp";
import Profile from "./Pages/profile/Profile";
import Account from "./Pages/account/Account";
import Footer from "./components/Footer/Footer";
import Blog from "./Pages/Blog";
import Messenger from "./Pages/messenger/Messenger";
import Signin from "./Pages/sign-in/SignIn";
import { UserProvider } from "../UserContext";
import RegisterPage from "./Pages/sign-in/RegisterPage";
import DonatePanel from "./Pages/donate/DonatePanel";
import PaySuccess from "./Pages/donate/PaySuccess";
import PayFail from "./Pages/donate/PayFail";
import DonateItems from "./Pages/donate/DonateItems";
import DonateItemsSuccess from "./Pages/donate/DonateItemsSuccess";
import Orders from "./Pages/orders/Orders";
import OrderDetail from "./Pages/orders/OrderDetail";
import CreateOrder from "./Pages/orders/CreateOrder";
import AdminDashboard from "./Pages/admin/dashboard/Dashboard";
import StoriesInPhoto from "../src/Pages/storiesInPhoto/StoriesInPhoto";
import TicketDetail from "./Pages/admin/tickets/TicketDetail";
import CreateReliefCase from "./Pages/admin/relief-cases/CreateReliefCase";
import ReliefCaseDetail from "./Pages/admin/relief-cases/ReliefCaseDetail";
import CreatePost from "./Pages/posts/CreatePost";
import PostDetail from "./Pages/posts/PostDetail";
import FloodAidFeed from "./Pages/community/Community";
import Sentiment from "./Pages/model-test/Sentiment";
import PredictFlood from "./Pages/predict-flood/PredictFlood";

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
          <Route path="/donate/items" element={<DonateItems />} />
          <Route path="/donate/success" element={<DonateItemsSuccess />} />
          <Route path="/payment-success" element={<PaySuccess />} />
          <Route path="/payment-fail" element={<PayFail />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/orders/create" element={<CreateOrder />} />

          <Route path="/training" element={<Training />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<GetHelp />} />
          <Route path="/post" element={<FloodAidFeed />} />
          <Route path="/account" element={<Account />} />
          <Route path="/messenger" element={<Messenger />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/predict-flood" element={<PredictFlood />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/stories" element={<StoriesInPhoto />} />
          <Route path="/test-model" element={<Sentiment />} />
          <Route path="/tickets/:id" element={<TicketDetail />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/profile/:id" element={<Profile />} />

          <Route
            path="/create-relief-case/:id"
            element={<CreateReliefCase />}
          />
          <Route
            path="/orders/create/:donationItemId"
            element={<CreateOrder />}
          />
          <Route
            path="/orders/create/:donationItemId"
            element={<CreateOrder />}
          />

          <Route
            path="/update/relief-case/:id"
            element={<ReliefCaseDetail />}
          />
        </Routes>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
