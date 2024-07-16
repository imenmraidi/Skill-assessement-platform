import React, { Component, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { createQuestion } from "../redux/slices/testsSlice";
import QuestionForm from "../components/QuestionForm";
import { useDispatch, useSelector } from "react-redux";

import "../styles/NewTest.css";
function AddEditQuestion() {
  const { idq } = useParams();
  const isCreateMode = !idq;

  return (
    <div className="QuestionForm">
      <QuestionForm />
    </div>
  );
}

export default AddEditQuestion;
