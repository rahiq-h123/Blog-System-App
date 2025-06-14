import { useState } from "react";

import "./App.css";
import ReactDOM from "react-dom";

import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import CreateEditPost from "./pages/CreateEditPost";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";


function App() {
  

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CreateEditPost" element={<CreateEditPost />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/CreateEditPost/:id" element={<CreateEditPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
