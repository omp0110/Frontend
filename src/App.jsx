import { useEffect, useState } from "react";

import Bot from "./Pages/Bot";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./Pages/Home";
import UserProtectedWrapper from "./Pages/userProtectedWrapper";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

export default function App() {
 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/chat" element={
        <UserProtectedWrapper>
           <Bot/>
       </UserProtectedWrapper>
        } />
         <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
