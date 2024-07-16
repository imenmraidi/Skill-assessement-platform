import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chip, Divider, Typography, Textarea, Input, Button } from "@mui/joy";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import CircleTwoToneIcon from "@mui/icons-material/CircleTwoTone";
import RadioButtonCheckedTwoToneIcon from "@mui/icons-material/RadioButtonCheckedTwoTone";
import SquareTwoToneIcon from "@mui/icons-material/SquareTwoTone";
import CheckBoxTwoToneIcon from "@mui/icons-material/CheckBoxTwoTone";
import { red, green, amber, grey } from "@mui/material/colors";
import { updateTestResults } from "../redux/slices/invitationsSlice";
import DeleteDialogModal from "./DeleteDialogModal";
import CorrectResponsePopper from "./correctResponsePopper";
import { toast } from "react-toastify";
import TagsPopper from "./TagsPopper";
import EditCandidate from "./EditCandidateInfo";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

function CandidateResults(props) {
  const dispatch = useDispatch();
  const { showInvit, test, questions, handleExportPdf, setShowInvit } = props;
  const { invitations, candidates } = useSelector(state => state.invitations);
  const invit =
    showInvit && invitations && invitations.find(i => i.id === showInvit.id);
  const candidate =
    showInvit &&
    candidates &&
    candidates.find(c => c.id === showInvit.candidateId);

  return (
    <>
      {props && invit ? (
        <>
          <div style={{ margin: 10, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                }}
              >
                <Typography level="h4" sx={{ mr: 2 }}>
                  {candidate?.fullname}
                </Typography>
                <EditCandidate
                  showInvit={showInvit}
                  setShowInvit={setShowInvit}
                />
              </div>

              <div>
                <Chip
                  sx={{ mr: 1 }}
                  size="md"
                  variant="soft"
                  color="primary"
                  onClick={() => {
                    if (
                      invit.testResults.filter(r => r.points === null)
                        .length !== 0
                    )
                      toast.error(
                        "Vous devez évaluer les réponses ouvertes d'abord"
                      );
                    else
                      handleExportPdf({
                        candidate,
                        test,
                        questions,
                        invit,
                      });
                  }}
                >
                  <Typography
                    startDecorator={<DownloadOutlinedIcon />}
                    textColor="primary.400"
                  >
                    PDF
                  </Typography>
                </Chip>

                <DeleteDialogModal
                  idi={invit.id}
                  todelete="i"
                  message="Êtes-vous sûr(e) de vouloir supprimer le candidat?"
                />
              </div>
            </div>
            <Divider role="presentation" sx={{ mt: 1, mb: 1 }} />
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex" }}>
                {invit.passedAtDate && (
                  <>
                    <Typography level="body1" color="info" variant="h2">
                      Evalué le :
                      {new Date(invit.passedAtDate).toLocaleString(undefined, {
                        timeZone:
                          Intl.DateTimeFormat().resolvedOptions().timeZone,
                      })}
                    </Typography>
                    <Divider orientation="vertical" sx={{ ml: 1, mr: 1 }} />
                  </>
                )}
                <Typography level="body1" color="info" variant="h2">
                  Invité le :
                  {new Date(invit.invitedAt).toLocaleString(undefined, {
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                  })}
                </Typography>
                <Divider orientation="vertical" sx={{ ml: 1, mr: 1 }} />
                <Typography level="body1" color="info" variant="h2">
                  Invitation expire le :
                  {new Date(invit.dateLimite).toLocaleString(undefined, {
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                  })}
                </Typography>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 20,
                overflow: "auto",
              }}
            >
              <div style={{ display: "flex", margin: 0 }}>
                <Chip
                  variant="soft"
                  size="lg"
                  sx={{
                    "--Chip-radius": "10px",
                    "--Chip-minHeight": "75px",
                  }}
                  color={
                    invit.testPassed === false
                      ? "neutral"
                      : invit.pourcentage >= test.notepassage
                      ? "success"
                      : invit.pourcentage < test.notepassage &&
                        invit.pourcentage >= test.notepassage - 5
                      ? "warning"
                      : "danger"
                  }
                >
                  <Typography
                    textColor={
                      invit.testPassed === false
                        ? "neutral.300"
                        : invit.pourcentage >= test.notepassage
                        ? "success.300"
                        : invit.pourcentage < test.notepassage &&
                          invit.pourcentage >= test.notepassage - 5
                        ? "warning.300"
                        : "danger.300"
                    }
                    level="h3"
                  >
                    {invit.testPassed === true
                      ? invit.pourcentage + "%"
                      : "Non évalué"}
                  </Typography>
                </Chip>
                <Typography
                  textColor="neutral.500"
                  level="body1"
                  sx={{ ml: 2,display:"flex",flexDirection:"column" }}
                >
                  {"Questions : " +
                    new Set(invit.testResults.map(r => r.questionId)).size +
                    " / " +
                    questions.length}
                  <Divider orientation="vertical" />

                  {"Points : " +
                    invit.score +
                    " / " +
                    questions.reduce((acc, q) => acc + q.note, 0)}
                  <Divider orientation="vertical" />

                  {"Temps total : " +
                    formatTime(tempstotal(invit.testResults)) +
                    " / " +
                    formatTime(
                      questions.reduce((acc, q) => acc + q.duree, 0) * 60
                    )}
                </Typography>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  overflowY: "auto",
                  width: "500px",
                }}
              >
                <Typography level="body1">
                  Email : {candidate?.email}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    overflow: "auto",
                    marginTop: "7px",
                  }}
                >
                  {invit.tags && invit.tags.length !== 0
                    ? invit.tags.split("_").map(t => {
                        return (
                          <Chip
                            key={t}
                            sx={{ ml: 0.5 }}
                            variant="soft"
                            color="neutral"
                            size="md"
                            startDecorator={
                              <LocalOfferOutlinedIcon fontSize="18" />
                            }
                          >
                            {t}
                          </Chip>
                        );
                      })
                    : null}
                  <TagsPopper invit={invit} />
                </div>
              </div>
            </div>
            <Typography level="h6" textColor="neutral.400">
              Résultats du test:
            </Typography>
            <Divider sx={{ mb: 0 }} />
            {/* ///////////////////Results///////////////////////////////////////////// */}
            {questions &&
              questions.map((q, index) => {
                const questionResults = invit.testResults.filter(
                  r => r.questionId === q.id
                );
                if (
                  Array.from(
                    new Set(
                      invit.testResults.map(r => {
                        return r.questionId;
                      })
                    )
                  ).includes(q.id)
                )
                  return (
                    <React.Fragment key={q.id}>
                      <div style={{ padding: 10 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography level="h6" sx={{ mb: 1 }}>
                            {index + 1 + "/ "}
                            {q.name.split("\n").map((line, index) => (
                              <React.Fragment key={index}>
                                {line}
                                <br />
                              </React.Fragment>
                            ))}
                          </Typography>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              height: "30px",
                            }}
                          >
                            {questionResults[0].points === q.note ? (
                              <Chip
                                size="sm"
                                sx={{ "--Chip-maxHeight": "30px" }}
                                style={{
                                  color: green[400],
                                  backgroundColor: green[50],
                                }}
                              >
                                Correcte
                              </Chip>
                            ) : questionResults[0].points === 0 ? (
                              !questionResults[0].textResponse &&
                              !questionResults[0].choixId ? (
                                <Chip
                                  size="sm"
                                  sx={{ "--Chip-maxHeight": "30px" }}
                                  style={{
                                    color: grey[500],
                                    backgroundColor: grey[200],
                                  }}
                                >
                                  Pas de réponse
                                </Chip>
                              ) : (
                                <Chip
                                  size="sm"
                                  sx={{ "--Chip-maxHeight": "30px" }}
                                  style={{
                                    color: red[500],
                                    backgroundColor: red[50],
                                  }}
                                >
                                  Incorrecte
                                </Chip>
                              )
                            ) : questionResults[0].points === null &&
                              q.type === "Text libre" ? (
                              !questionResults[0].textResponse ? (
                                <Chip
                                  size="sm"
                                  sx={{ "--Chip-maxHeight": "30px" }}
                                  style={{
                                    color: grey[500],
                                    backgroundColor: grey[200],
                                  }}
                                >
                                  Pas de réponse
                                </Chip>
                              ) : (
                                <CorrectResponsePopper
                                  q={q}
                                  id={questionResults[0].id}
                                />
                              )
                            ) : (
                              <Chip
                                size="sm"
                                sx={{ "--Chip-maxHeight": "30px" }}
                                style={{
                                  color: amber[500],
                                  backgroundColor: amber[50],
                                }}
                              >
                                Partiellement correcte
                              </Chip>
                            )}

                            {questionResults[0].points !== null ? (
                              <>
                                <Typography
                                  level="body3"
                                  sx={{
                                    ml: 1,
                                    height: 30,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "90px",
                                    padding: 0,
                                  }}
                                >
                                  {"Note :  " +
                                    questionResults[0].points +
                                    " / " +
                                    q.note}
                                </Typography>
                              </>
                            ) : null}
                            <Typography
                              level="body3"
                              sx={{
                                ml: 0,
                                height: 30,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "110px",
                                padding: 0,
                              }}
                            >
                              {"Durée :  " +
                                formatTime(
                                  invit.testResults.find(
                                    r => r.questionId === q.id
                                  ).dureeReponse
                                ) +
                                " / " +
                                formatTime(q.duree * 60)}
                            </Typography>
                          </div>
                        </div>

                        {q.type === "Text libre" ? (
                          <div style={{ color: "red" }}>
                            <Textarea
                              minRows={2}
                              maxRows={4}
                              value={questionResults[0].textResponse || ""}
                              disabled
                            />
                          </div>
                        ) : (
                          q.choix.map(c => {
                            return (
                              <Typography
                                key={c.id}
                                sx={{ mb: 1 }}
                                level="body2"
                                startDecorator={
                                  questionResults
                                    .map(s => {
                                      return s.choixId;
                                    })
                                    .includes(c.id) ? (
                                    q.type === "Choix unique" ? (
                                      <RadioButtonCheckedTwoToneIcon
                                        fontSize="small"
                                        sx={{
                                          color:
                                            c.correctResponse === true
                                              ? "#81c784"
                                              : red[300],
                                        }}
                                      />
                                    ) : (
                                      <CheckBoxTwoToneIcon
                                        fontSize="small"
                                        sx={{
                                          color:
                                            c.correctResponse === true
                                              ? "#81c784"
                                              : red[400],
                                        }}
                                      />
                                    )
                                  ) : q.type === "Choix unique" ? (
                                    <CircleTwoToneIcon
                                      fontSize="small"
                                      sx={{
                                        color:
                                          c.correctResponse === true
                                            ? "#81c784"
                                            : red[400],
                                      }}
                                    />
                                  ) : (
                                    <SquareTwoToneIcon
                                      fontSize="small"
                                      sx={{
                                        color:
                                          c.correctResponse === true
                                            ? "#81c784"
                                            : red[400],
                                      }}
                                    />
                                  )
                                }
                              >
                                {c.name}
                              </Typography>
                            );
                          })
                        )}
                      </div>
                      <Divider sx={{ mt: 1, mb: 1 }} />
                    </React.Fragment>
                  );
              })}
          </div>
        </>
      ) : (
        <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
          Sélectionner un candidat
        </Typography>
      )}
    </>
  );
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes > 0) {
      {
        if (remainingSeconds > 0) return `${minutes}m ${remainingSeconds}s`;
        else return `${minutes}m`;
      }
    } else {
      return `${remainingSeconds}s`;
    }
  }
  function tempstotal(obj) {
    const uniqueIds = {};
    let totalTime = 0;

    for (let i = 0; i < obj.length; i++) {
      const element = obj[i];
      const id = element.questionId;
      const time = element.dureeReponse;

      if (!uniqueIds[id]) {
        totalTime += time;
        uniqueIds[id] = true;
      }
    }

    return totalTime;
  }
}

export default CandidateResults;
