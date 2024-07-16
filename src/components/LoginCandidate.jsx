import React, { Component, useEffect, useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useLinkClickHandler,
  useLocation,
} from "react-router-dom";
import { loginCandidate } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Typography,
  Avatar,
  Checkbox,
  Button,
  Divider,
  Alert,
  Chip,
} from "@mui/joy";
import { TextField, FormControl, FormHelperText } from "@mui/material";
function LoginCandidate(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const { test, invit } = props;
  const [email, setEmail] = useState({ value: "", error: "" });
  const [fullname, setFullname] = useState("");

  const [condition, setCondition] = useState({ value: false, error: "" });
  const submit = async event => {
    event.preventDefault();
    if (!condition.value) {
      setCondition(e => {
        return {
          ...e,
          error: "Veuillez accepter nos termes et conditions",
        };
      });
    } else if (!email.error && condition.value) {
      const action = await dispatch(
        loginCandidate({
          email: email.value,
          candidateId: invit.candidateId,
          invitId: invit.id,
          fullname,
        })
      );
      if (loginCandidate.rejected.match(action)) {
        if (action.payload.response.status === 401) {
          props.setAuthorized(false);
        } else
          toast.error(
            action.payload.response.status === 500
              ? "une erreur s'est prosuite essayez ultérieurement"
              : action.payload.response.data,
            {
              position: "top-center",
              theme: "dark",
            }
          );
      } else
        navigate(`/candidate/beginTest?token=${token}`, {
          state: { props: { test, invit } },
          replace: true,
        });
    }
  };
  const h =
    test &&
    test.questions &&
    Math.floor(test.questions.reduce((acc, q) => acc + q.duree, 0) / 60);
  const min =
    test &&
    test.questions &&
    test.questions.reduce((acc, q) => acc + q.duree, 0) % 60;
  const duree = test && h !== 0 ? h + "h" + min + "min" : min + "min";

  return (
    test && (
      <div className="LoginCandidate">
        <div style={{ display: "flex", marginTop: "70px", padding: "60px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexBasis: "60%",
              paddingRight: "100px",
            }}
          >
            <form onSubmit={submit}>
              <Alert color="info" sx={{ mb: 3 }}>
                Veuillez vous authentifier avec l'adresse email à laquelle vous
                avez reçu le lien du test
              </Alert>
              <TextField
                required
                fullWidth
                value={fullname}
                onChange={event => {
                  setFullname(event.target.value);
                }}
                label="Nom et prénom"
                variant="filled"
                sx={{ mb: 2 }}
              />
              <TextField
                required
                fullWidth
                error={email.error ? true : false}
                value={email.value}
                onChange={event => {
                  setEmail(e => {
                    return {
                      ...e,
                      value: event.target.value,
                      error: !/^[^s@]+@[^s@]+.[^s@]+$/.test(event.target.value)
                        ? "Email invalide"
                        : "",
                    };
                  });
                }}
                label="Email"
                variant="filled"
                helperText={email.error ? email.error : null}
                sx={{ mb: 2 }}
              />

              <FormControl
                sx={{ mt: 2 }}
                error={condition.error ? true : false}
              >
                <Checkbox
                  checked={condition.value}
                  onChange={event =>
                    setCondition(e => {
                      return {
                        ...e,
                        value: event.target.checked,
                      };
                    })
                  }
                  label={
                    <Typography textColor={"neutral.400"}>
                      Je comprends qu'une fois que j'ai commencé ce test, je ne
                      peux pas quitter et revenir à ce test plus tard.
                    </Typography>
                  }
                />
                <FormHelperText>
                  {condition.error ? condition.error : null}
                </FormHelperText>
              </FormControl>
              <Button
                fullWidth
                type="submit"
                sx={{ mt: 5, "--Button-radius": "5px" }}
                size="lg"
              >
                Commencer le test
              </Button>
            </form>
          </div>
          <div style={{ paddingLeft: "40px", paddingTop: "0px" }}>
            <Typography level="h5" variant="h2" sx={{mb:1}}>
              Compétences du test :
            </Typography>
            {test &&
              test.skills &&
              test.skills.split("_").map(skill => {
                return (
                  <Chip
                    size="md"
                    sx={{ m: 1,ml:0 }}
                    key={skill}
                    variant="soft"
                    color="neutral"
                  >
                    {skill}
                  </Chip>
                );
              })}
            <Typography level="h5" variant="h2" sx={{mt:2}}>
              Durée du test:{"  "}
              <Typography level="h6" textColor={"neutral.400"}>
                {"  "}
                {duree}
              </Typography>
            </Typography>
            <Typography level="h5" variant="h2">
              Experience exigée:{"  "}
              <Typography level="h6" textColor={"neutral.400"}>
                {test.experience}
              </Typography>
            </Typography>
            <Typography level="h5" variant="h2">
              Pourcentage de réussite:{"  "}
              <Typography level="h6" textColor={"neutral.400"}>
                {test.notepassage}%
              </Typography>
            </Typography>
          </div>
        </div>
      </div>
    )
  );
}

export default LoginCandidate;
