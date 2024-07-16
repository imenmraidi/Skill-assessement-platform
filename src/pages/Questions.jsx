import React, { Component, useEffect } from "react";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import "../styles/Questions.css";
import QuestionsList from "./QuestionsList";
import AddEditQuestion from "./AddEditQuestion";

function Questions() {
  return (
    <div className="questionsPage">
      <Routes>
        <Route path="*" element={<QuestionsList />} />
        <Route path="/newquestion" element={<AddEditQuestion />} exact />
        <Route path="/editquestion/:idq" element={<AddEditQuestion />} exact />
      </Routes>
    </div>
  );
}

export default Questions;
