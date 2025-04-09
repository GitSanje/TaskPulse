import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/users/login";
import SignupPage from "./components/users/register";

import Dashboard from "./components/layout/dashboard";
import Home from "./components/layout/home";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
