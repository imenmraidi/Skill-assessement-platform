import React, { useEffect } from "react";
import "../styles/Test.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import Questions from "./Questions";
import Statistics from "./Statistics";
import Settings from "./Settings";
import InviteModal from "../components/InviteModal";

import { Routes, Route } from "react-router-dom";
import { Typography } from "@mui/joy";
import Candidats from "./Candidats";
import {
  getTestInvitations,
  getTestCandidates,
} from "../redux/slices/invitationsSlice";

function Test() {
  const dispatch = useDispatch();
  const { tests } = useSelector(state => state.tests);
  const { id } = useParams();
  const test = tests.find(e => e.id === id);
  useEffect(() => {
    const fetchData = async () => {
      const action1 = await dispatch(getTestInvitations({ testId: id }));
      const action2 = await dispatch(getTestCandidates({ testId: id }));

      if (getTestInvitations.rejected.match(action1)) {
        console.log(action1);
      } else if (getTestInvitations.rejected.match(action2)) {
        console.log(action2);
      }
    };
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="Test">
      <div className="title">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography level="h4" sx={{ ml: "15px", mb: "5px", mt: "5px" }}>
            {test?.name}
          </Typography>
          <InviteModal test={test} />
        </div>
        <Nav />
      </div>
      <div className="content">
        <Routes>
          <Route path="*" element={<Questions />} />
          <Route path="/questions/*" element={<Questions />} />
          <Route path="/candidats" element={<Candidats />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default Test;
