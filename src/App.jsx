import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Recruiter from "./pages/Recruiter";
import CandidatTest from "./pages/CandidatTest";
import "./styles/App.css";
import LoginCandidate from "./components/LoginCandidate";
import PasserTest from "./pages/PasserTest";
import Resultats from "./pages/Resultats";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/recruiter/*" element={<Recruiter />} />
        <Route path="/candidate/pass_test/" element={<CandidatTest />} />
        <Route path="/candidate/beginTest/" element={<PasserTest />} />
        <Route path="/candidate/results/" element={<Resultats />} />

      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
