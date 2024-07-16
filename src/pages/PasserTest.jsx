import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderPasserTest from "../components/HeaderPasserTest";
import { useNavigate, useLocation } from "react-router-dom";
import PassTestAlert from "../components/PassTestAlert";
import { toast } from "react-toastify";
import axios from "axios";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import { Fragment } from "react";
import "../styles/PasserTest.css";
import { useRef } from "react";
import {
  Typography,
  Divider,
  Textarea,
  Button,
} from "@mui/joy";
function PasserTest() {
  useEffect(() => {
    const handleUnload = event => {
      if (event.returnValue === "") {
        // User has not yet decided to leave the page, so do nothing
        return;
      }
      // Show alert
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const props = location.state?.props;
  const test = props?.test;
  const invit = props?.invit;
  const questions = test?.questions;
  const [questionIndex, setQuestionIndex] = useState(
    localStorage.getItem("storage")
      ? questions.findIndex(q => q.id === localStorage.getItem("storage"))
      : 0
  );
  const [timeLeft, setTimeLeft] = useState(
    localStorage.getItem("timeLeft")
      ? parseInt(localStorage.getItem("timeLeft"))
      : questions && questions[0].duree * 60
  );
  const [response, setResponse] = useState(null);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  useEffect(() => {
    const timer =
      timeLeft > 0 &&
      setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    localStorage.setItem("timeLeft", parseInt(timeLeft - 1));
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && questions) {
      storeResponse();
      if (questionIndex + 1 === questions?.length) {
        localStorage.removeItem("storage");
        localStorage.removeItem("timeLeft");
        navigate("/candidate/results", {
          state: { invit },
          replace: true,
        });
      } else {
        setQuestionIndex(questionIndex + 1);
        localStorage.setItem("storage", questions[questionIndex + 1].id);
        setTimeLeft(questions[questionIndex + 1]?.duree);
        localStorage.setItem(
          "timeLeft",
          parseInt(questions[questionIndex + 1]?.duree)
        );
        setResponse(null);
      }
    }
  }, [timeLeft]);
  const storeResponse = async () => {
    try {
      const reponse = await axios.post(
        "http://localhost:3000/results",

        {
          candidatTestId: invit.id,
          questionId: questions[questionIndex].id,
          response,
          dureeReponse: questions[questionIndex].duree * 60 - timeLeft,
        }
      );
    } catch (error) {
      toast.error("Une erreure s'est produite", {
        position: "top-center",
        theme: "dark",
      });
    }
  };
  const handleNextQuestion = () => {
    storeResponse();
    if (questions && questionIndex + 1 === questions.length) {
      localStorage.removeItem("storage");
      localStorage.removeItem("timeLeft");
      navigate("/candidate/results", {
        state: { invit },
        replace: true,
      });
    } else {
      setQuestionIndex(questionIndex + 1);
      localStorage.setItem("storage", questions[questionIndex + 1].id);
      setTimeLeft(questions[questionIndex + 1]?.duree * 60);
      localStorage.setItem(
        "timeLeft",
        parseInt(questions[questionIndex + 1]?.duree * 60)
      );
      setResponse(null);
    }
  };
  const inputRefs = useRef([]);
  return (
    <>
      <HeaderPasserTest test={test} />
      {!props ? (
        <PassTestAlert />
      ) : (
        test &&
        questions && (
          <div className="beginTest">
            <div style={{ flex: 1, overflow: "auto" }}>
              <Typography level="h5" sx={{ m: 2 }}>
                {questions &&
                  questions[questionIndex]?.name
                    .split("\n")
                    .map((line, index) => (
                      <Fragment key={index}>
                        {line}
                        <br />
                      </Fragment>
                    ))}
              </Typography>
              <Divider />
              <div style={{ overflow: "auto" }}>
                {questions && questions[questionIndex].type === "Text libre" ? (
                  <Textarea
                    sx={{ m: 1 }}
                    minRows={16}
                    onChange={e => setResponse(e.target.value)}
                  />
                ) : questions ? (
                  questions[questionIndex].choix.map((c, index) => {
                    if (questions[questionIndex].type === "Choix unique") {
                      return (
                        <div
                          key={c.id}
                          className={`option-box ${
                            response === c.id ? "selected" : ""
                          }`}
                          onClick={() => {
                            inputRefs.current[index].click();
                          }}
                        >
                          <Typography
                            level="body1"
                            fontSize={18}
                            startDecorator={
                              <input
                                ref={el => (inputRefs.current[index] = el)}
                                type="radio"
                                value={c.id}
                                name="rep"
                                checked={response === c.id}
                                onChange={e => setResponse(e.target.value)}
                                className="radio-button"
                              />
                            }
                          >
                            {c.name}
                          </Typography>
                        </div>
                      );
                    } else if (
                      questions &&
                      questions[questionIndex].type === "Choix multiple"
                    ) {
                      return (
                        <div
                          key={c.id}
                          className={`option-box ${
                            response && response.includes(c.id)
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => {
                            inputRefs.current[index].click();
                          }}
                        >
                          <Typography
                            level="body1"
                            fontSize={18}
                            startDecorator={
                              <input
                                className="checkbox"
                                ref={el => (inputRefs.current[index] = el)}
                                key={c.id}
                                type="checkbox"
                                value={c.id}
                                onChange={e => {
                                  if (e.target.checked) {
                                    setResponse(prevState => {
                                      if (prevState === null) {
                                        return [e.target.value];
                                      } else {
                                        return [...prevState, e.target.value];
                                      }
                                    });
                                  } else {
                                    setResponse(prevState => {
                                      if (prevState === null) {
                                        return null;
                                      } else {
                                        return prevState.filter(
                                          value => value !== e.target.value
                                        );
                                      }
                                    });
                                  }
                                }}
                              />
                            }
                          >
                            {c.name}
                          </Typography>
                        </div>
                      );
                    } else return null;
                  })
                ) : null}
              </div>
            </div>
            <div>
              <Divider />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "0px",
                  padding: "15px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography fontSize={18} level="body1">
                    {"Q " + (questionIndex + 1) + "/" + questions.length}
                  </Typography>
                  <Divider orientation="vertical" sx={{ m: 1 }} />
                  <Typography
                    fontSize={18}
                    level="h6"
                    // sx={{ ml: 1 }}
                    startDecorator={
                      <AccessAlarmIcon
                        sx={{ color: "#0c219c", fontSize: 22 }}
                      />
                    }
                  >
                    {formattedTime}
                  </Typography>
                </div>
                <div>
                  <Button onClick={handleNextQuestion}>
                    {questionIndex + 1 === questions.length
                      ? "Terminer"
                      : "Suivant"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}

export default PasserTest;
