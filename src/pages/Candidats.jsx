import React, { Component, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Candidats.css";
import { Input, Typography } from "@mui/joy";
import CandidateCard from "../components/CandidateCard";
import SearchIcon from "@mui/icons-material/Search";
import CandidateResults from "../components/CandidateResults";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import store from "../redux/store";
import { Provider } from "react-redux";
import CandidateResultsPDF from "../components/CandidateResultsPDF";

import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

function Candidats() {
  const { id } = useParams();
  const { tests, tetsStatus } = useSelector(state => state.tests);
  const test = tests && tests.find(t => t.id === id);
  const questions = test && test.questions;
  const { invitations, candidates } = useSelector(state => state.invitations);
  const [showInvit, setShowInvit] = useState();
  const [filter, setFilter] = useState("");
  const candidate =
    candidates && candidates.find(c => c.id === showInvit?.candidateId);
  const handleExportPdf = async props => {
    const doc = <CandidateResultsPDF data={props} />;
    const asPdf = pdf();
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    saveAs(blob, `Rapport_d\'évaluation_${candidate?.fullname}.pdf`);
  };
  return (
    invitations &&
    candidates && (
      <div className="candidatTest">
        <div className="listCandidates">
          <div className="candiatesCards">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <FormControl variant="standard">
                <InputLabel>Filter par score</InputLabel>
                <Select
                  sx={{ width: "30ch", height: "35px" }}
                  label="Filter par poste"
                  value={filter}
                  onChange={event => {
                    setFilter(event.target.value);
                  }}
                >
                  <MenuItem value={""}>{"."}</MenuItem>
                  <MenuItem value={"≈"}>{`≈${test?.notepassage}%`}</MenuItem>
                  <MenuItem value={">="}>{`>=${test?.notepassage}%`}</MenuItem>
                  <MenuItem value={"<"}>{`<${test?.notepassage}%`}</MenuItem>
                </Select>
              </FormControl>
            </div>
            {invitations.length !== 0 ? (
              filter ? (
                filter === "<" ? (
                  invitations
                    .filter(
                      i => i.pourcentage && i.pourcentage < test.notepassage
                    )
                    .map(i => (
                      <CandidateCard
                        key={i.id}
                        invit={i}
                        test={test}
                        setShowInvit={setShowInvit}
                        showInvit={showInvit}
                        questions={questions}
                      />
                    ))
                ) : filter === "≈" ? (
                  invitations
                    .filter(
                      i =>
                        i.pourcentage < test.notepassage &&
                        i.pourcentage >= test.notepassage - 5
                    )
                    .map(i => (
                      <CandidateCard
                        key={i.id}
                        invit={i}
                        test={test}
                        setShowInvit={setShowInvit}
                        showInvit={showInvit}
                        questions={questions}
                      />
                    ))
                ) : filter === ">=" ? (
                  invitations
                    .filter(i => i.pourcentage > test.notepassage)
                    .map(i => (
                      <CandidateCard
                        key={i.id}
                        invit={i}
                        test={test}
                        setShowInvit={setShowInvit}
                        showInvit={showInvit}
                        questions={questions}
                      />
                    ))
                ) : null
              ) : (
                invitations.map(i => {
                  return (
                    <CandidateCard
                      key={i.id}
                      invit={i}
                      test={test}
                      setShowInvit={setShowInvit}
                      showInvit={showInvit}
                      questions={questions}
                    />
                  );
                })
              )
            ) : (
              <Typography>Aucun candidat a été invité à ce test</Typography>
            )}
          </div>
        </div>
        <div className="candidateResults">
          <CandidateResults
            showInvit={showInvit}
            setShowInvit={setShowInvit}
            test={test}
            questions={questions}
            handleExportPdf={handleExportPdf}
          />
        </div>
      </div>
    )
  );
}

export default Candidats;
