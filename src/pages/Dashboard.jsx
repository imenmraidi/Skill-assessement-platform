import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import TestCard from "../components/TestCard";
import { getTests } from "../redux/slices/testsSlice";
import { Button } from "@mui/joy";
import "../styles/Dashboard.css";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
function Dashboard() {
  const navigate = useNavigate();
  const { tests, tetsStatus } = useSelector(state => state.tests);
  const [poste, setPoste] = useState('');
  return (
    <div className="dashboard">
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <FormControl sx={{ width: "30ch" }}>
          <InputLabel>Filter par poste</InputLabel>
          <Select
            label="Filter par poste"
            value={poste}
            onChange={event => {
              setPoste(event.target.value);
            }}
          >
            <MenuItem  value={""}>{"."}</MenuItem>
            {[...new Set(tests.map((t) => t.poste))].map(poste => {
              return <MenuItem key={poste} value={poste}>{poste}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>

      <div className="testList">
        <div className="newTest">
          <Button
            variant="outlined"
            onClick={() => navigate("/recruiter/newtest")}
          >
            Créer un test
          </Button>
        </div>
        {poste
          ? tests.map(test => {
              if (test.poste === poste)
                return <TestCard key={test.id} id={test.id} />;
              else return null;
            })
          : tests.map(test => <TestCard key={test.id} id={test.id} />)}
      </div>
    </div>
  );
}

export default Dashboard;
