import React, { Component, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createTest, updateTest } from "../redux/slices/testsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Skills from "../components/Skills";
import { toast } from "react-toastify";
import {
  Input,
  Slider,
  Button,
  Textarea,
  RadioGroup,
  Radio,
  FormLabel,
  Typography,
  Divider,
} from "@mui/joy";
import { FormControl, FormHelperText } from "@mui/material";

function TestForm() {
  const { id } = useParams();
  const isCreateMode = !id;
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [error, setError] = useState({ skills: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { tests, tetsStatus } = useSelector(state => state.tests);

  const test = tests && id && tests.find(t => t.id === id);

  useEffect(() => {
    if (!isCreateMode) {
      const test = tests && tests.find(t => t.id === id);
      const skills = test && test.skills.split("_");
      const fields = ["name", "poste", "notepassage", "experience"];
      test && fields.forEach(field => setValue(field, test[field]));
      skills && setSelectedSkills([...skills]);
    }
  }, [tests]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const onSubmit = async data => {
    if (selectedSkills.length === 0)
      return setError(p => {
        return { ...p, skills: "Selectionnez les compétences du test" };
      });
    else {
      if (isCreateMode) addTest(data);
      else editTest(data);
    }
  };
  const addTest = async data => {
    const skills = selectedSkills.join("_");
    const action = await dispatch(
      createTest({
        ...data,
        skills,
        recruiterId: user.id,
        notepassage: Number(data.notepassage),
      })
    );
    if (createTest.rejected.match(action)) {
      alert(action.payload);
    } else {
      toast.success("Test crée avec succès", { position: "top-center" });
      navigate(`/recruiter/test/${action.payload.id}`);
    }
  };
  const editTest = async data => {
    const skills = selectedSkills.join("_");
    const action = await dispatch(
      updateTest({
        ...data,
        skills,
        id,
        notepassage: Number(data.notepassage),
      })
    );
    if (updateTest.rejected.match(action)) {
      toast.error("Une erreur s'est produite")
    } else toast.success("Test modifé avec succès");
  };
  return (
    <>
      <div className={isCreateMode ? "createTestForm" : "updateTestForm"}>
        <Typography level="h4" variant="h2">
          {isCreateMode ? "Créer un nouveau test" : "Modifier le test"}
        </Typography>
        <Divider />
        <form
          style={{
            display: "flex",
            flex: 1,
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexBasis: "40%",
              padding: "5px",
            }}
          >
            <FormControl error={errors.name ? true : false}>
              <FormLabel sx={{ fontSize: 16, mb: 1, mt: 1 }}>
                Intitulé du Test
              </FormLabel>
              <Input
                error={errors.name ? true : false}
                {...register("name", {
                  required: "Champ obligatoire",
                })}
              />
              <FormHelperText sx={{ ml: 0 }}>
                {errors.name ? errors.name.message : null}
              </FormHelperText>
            </FormControl>
            <FormControl error={errors.poste ? true : false}>
              <FormLabel sx={{ fontSize: 16, mb: 1, mt: 1 }}>Poste</FormLabel>
              <Textarea
                label=""
                maxRows={3}
                variant="outlined"
                {...register("poste", {
                  required: "Champ obligatoire",
                })}
              />
              <FormHelperText sx={{ ml: 0 }}>
                {errors.poste ? errors.poste.message : null}
              </FormHelperText>
            </FormControl>
            <FormControl
              sx={{ mt: 2, mr: 2 }}
              error={errors.notepassage ? true : false}
            >
              <FormLabel
                sx={{
                  fontSize: 16,
                  "&.Mui-focused": {
                    color: "black",
                  },
                }}
                id="notepassage"
              >
                Pourcentage de réussite
              </FormLabel>
              <Slider
                sx={{ mb: 0, width: "50ch" }}
                defaultValue={isCreateMode ? 100 : test ? test.notepassage : 0}
                aria-label="Default"
                valueLabelDisplay="auto"
                color="primary"
                marks={[
                  {
                    value: 100,
                    label: "100%",
                  },
                ]}
                {...register("notepassage", {
                  validate: value => {
                    if (+value === 0) {
                      return "Pourcentage de passage doit étre > 0";
                    }
                    return true;
                  },
                })}
              />
              <FormHelperText sx={{ ml: 0, mt: 0 }}>
                {errors.notepassage ? errors.notepassage.message : null}
              </FormHelperText>
            </FormControl>{" "}
            <FormControl
              sx={{ mt: 2, width: "50ch" }}
              error={errors.experience ? true : false}
            >
              <FormLabel sx={{ fontSize: 16 }}>Experience exigée</FormLabel>
              <RadioGroup
                sx={{ mt: 1 }}
                orientation="horizontal"
                {...register("experience", {
                  required: "Selectionnez l'expérience exigée",
                })}
              >
                {["Junior", "Senior", "Expert"].map(i => {
                  return (
                    <Radio
                      checked={watch("experience") === i}
                      key={i}
                      value={i}
                      label={i}
                      {...register("experience")}
                    />
                  );
                })}
              </RadioGroup>
              <FormHelperText sx={{ ml: 0 }}>
                {errors.experience ? errors.experience.message : null}
              </FormHelperText>
            </FormControl>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "5px",
              marginLeft: "20px",
            }}
          >
            <Skills
              error={error}
              selectedSkills={selectedSkills}
              setSelectedSkills={setSelectedSkills}
            />
          </div>{" "}
          <div
            style={{
              alignSelf: "flex-end",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button type="submit" variant="soft" size="lg" sx={{ mt: 2 }}>
              Sauvegarder
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default TestForm;
