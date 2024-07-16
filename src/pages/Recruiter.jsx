import React, { Component, useEffect } from "react";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Recruiter.css";
import Dashboard from "./Dashboard";
import { getTests } from "../redux/slices/testsSlice";
import Test from "./Test";
import Header from "../components/Header";
import NewTest from "./NewTest";
import { getRecruiter } from "../redux/slices/authSlice";

function Recruiter() {
  const { user, authStatus } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const action = await dispatch(getTests({ id: user?.id }));
      const action2 = await dispatch(getRecruiter());
      if (getTests.rejected.match(action)) {
        console.log(action.payload);
      }
    };
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="recruiter">
      <Header />
      <Routes>
        <Route path="*" element={<Dashboard />} />
        <Route path="/test/:id/*" element={<Test />} exact />
        <Route path="/newtest" element={<NewTest />} exact />
      </Routes>
    </div>
  );
}

export default Recruiter;
