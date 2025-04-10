import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/users/login";
import SignupPage from "./components/users/register";

import Dashboard from "./components/layout/dashboard";
import Home from "./components/layout/home";
import MainLayout from "./components/layout/MainLayout";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
