import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./forms/register";
import LoginForm from "./forms/login";
import UpdateForm from "./forms/updateUser";
import LandingPage from "./screens/landingPage";
import AboutUs from "./screens/aboutUs";
import ProtectedRoute from "./modules/auth/protectedRoute";
import WhatWeDo from "./screens/what_we_do";
import WhoWeAre from "./screens/who_we_are";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<UpdateForm />} />
          </Route>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
