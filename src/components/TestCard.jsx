import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Button, Chip, Divider } from "@mui/joy";
import { Link } from "react-router-dom";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import InviteModal from "./InviteModal";

function TestCard(props) {
  const { tests, tetsStatus } = useSelector(state => state.tests);
  const test = tests && tests.find(e => e.id === props.id);
  const invited = test.candidates.length;
  const passed = test.candidates.filter(
    e => e.testId === props.id && e.testPassed === true
  ).length;
  const qualified = test.candidates.filter(
    i => i.testId === props.id && i.pourcentage >= test.notepassage
  ).length;
  const qualification = passed ? ((qualified / passed) * 100).toFixed(0) : 0;
  return (
    tests && (
      <div className="testCard">
        <div
          style={{
            padding: "5px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{display:"flex",flexDirection:"column"}}>
            <Typography
              className="cardText"
              level="h5"
              style={{ textDecoration: "none" }}
            >
              {test.name}
            </Typography>
            <Typography
              className="cardText"
              level="body1"
              style={{ textDecoration: "none" }}
            >
              {test.poste}
            </Typography>
          </div>

          <Button
            component={Link}
            to={`/recruiter/test/${props.id}`}
            variant="soft"
            size="sm"
            endDecorator={<KeyboardArrowRight fontSize="small" />}
            sx={{ height: "20px", "--Button-gap": "0px", p: 1 }}
          >
            Ouvrir
          </Button>
        </div>
        <Divider sx={{ mb: 1 }} />
        <div>
          {test.skills.split("_").map(s => {
            return (
              <Chip
                style={{ backgroundColor: "#eaeef9" }}
                key={s}
                size="sm"
                variant="plain"
                sx={{
                  color: "neutral.600",
                  "--Chip-radius": "10px",
                  mr: 1,
                  mt: 0.5,
                  mb: 0.5,
                }}
              >
                <Typography level="bosy2">{s}</Typography>
              </Chip>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "5px",
            marginTop: "5px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography
              className="cardText"
              level="h5"
              textColor={"neutral.700"}
            >
              {qualification}%
            </Typography>
            <Typography className="cardText" level="body2">
              Qualification
            </Typography>
          </div>
          <div>
            <Typography className="cardText" level="body2">
              Invités: {invited}
            </Typography>
            <Typography className="cardText" level="body2">
              Evalués : {passed}
            </Typography>
          </div>
        </div>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <div
          style={{
            display: "flex",
          }}
        >
          <InviteModal test={test} />
          <Divider orientation="vertical" sx={{ mr: 1, ml: 1 }} />
          <Typography
            level="body2"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Crée le:{" "}
            {new Date(test.createdAt).toLocaleString(undefined, {
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            })}
          </Typography>
        </div>
      </div>
    )
  );
}

export default TestCard;
