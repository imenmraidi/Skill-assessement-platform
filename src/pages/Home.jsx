import React, { Component } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home">
      <Routes>
        <Route path="/" element={<Login  />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}
