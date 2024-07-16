import React, { Component, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PassTestAlert from "../components/PassTestAlert";
import "../styles/CandidatTest.css";
import LoginCandidate from "../components/LoginCandidate";
import PasserTest from "./PasserTest";
import logo from "../images/logo_soft.png";
import { Divider, Typography, Avatar } from "@mui/joy";
import axiosAuth from "../axiosConfig";
import axios from "axios";
import {
  Route,
  Routes,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

function CandidatTest() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const [authorized, setAuthorized] = useState();
  const [test, setTest] = useState({});
  const [invit, setInvit] = useState({});
  useEffect(() => {
    const post = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/invitations/testAuthorization",

          { token }
        );
        setAuthorized(true);
        setTest(response.data.test);
        setInvit(response.data.invit);
      } catch (error) {
        setAuthorized(false);
      }
    };
    post();
  }, []);
 

  return (
    <div className="CandidatTest">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        <Avatar src={logo} sx={{ width: 60, height: 60 }} variant="plain" />
        <div
          style={{
            marginRight: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Typography level="h3">{test?.name}</Typography>
          <Typography level="h5" textColor={"neutral.400"}>
            Test d'évaluation
          </Typography>
        </div>
      </div>
      <Divider />

      {
        authorized === false ? (
          <PassTestAlert />
        ) : (
          <LoginCandidate
            test={test}
            invit={invit}
            setAuthorized={setAuthorized}
          />
        )

      }
    </div>
  );
}

export default CandidatTest;
