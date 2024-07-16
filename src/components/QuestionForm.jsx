import React, { Component, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createQuestion, updateQuestion } from "../redux/slices/testsSlice";
import { useForm } from "react-hook-form";
import QuestionAndChoices from "./QuestionAndChoices";
import QuestionInfos from "./QuestionInfos";
import { Button, Typography, Divider } from "@mui/joy";
import { toast } from "react-toastify";

function QuestionForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const { idq } = useParams();

  const isCreateMode = !idq;
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [error, setError] = useState({ skills: "", choix: "" });
  const [choix, setChoix] = useState([]);
  const [q, setQuestion] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    unregister,
    watch,
    setValue,
    getValues,
  } = useForm({ choix: {}, iscorrect: [] });
  const { tests, tetsStatus } = useSelector(state => state.tests);

  useEffect(() => {
    if (!isCreateMode) {
      const test = tests && tests.find(t => t.id === id);
      const q = test && test.questions.find(q => q.id === idq);
      const qchoix = q && q.choix;
      const fields = ["name", "note", "duree", "type", "difficulty"];
      q && fields.forEach(field => setValue(field, q[field]));
      if (q && qchoix.length !== 0) {
        setChoix([
          ...choix,
          ...qchoix
            .map(e => {
              return e.id;
            })
            .filter(elem => !choix.includes(elem)),
        ]);
        setValue(
          "choix",
          qchoix.reduce((acc, choice) => {
            acc[choice.id] = choice.name;
            return acc;
          }, {})
        );
        setValue(
          "iscorrect",
          qchoix.filter(e => e.correctResponse === true).map(e => e.id)
        );
      }
      setQuestion(p => {
        return { ...p, ...q };
      });
    }
  }, []);

  const onSubmit = async data => {
    let listChoix = [];
    if (data.type === "Choix unique" || data.type === "Choix multiple") {
      if (!data.choix || Object.keys(data.choix).length === 0)
        return setError(p => {
          return { ...p, choix: "Une question à doit avoir au moins un choix" };
        });
      else {
        listChoix = Object.keys(data.choix).map(key => {
          const name = data.choix[key];
          const correctResponse = data.iscorrect.includes(key);
          if (isCreateMode) return { name, correctResponse };
          else return { id: key, name, correctResponse };
        });
      }
    }
    if (isCreateMode) addQuestion(listChoix, data);
    else editQuestion(listChoix, data);
  };
  const addQuestion = async (listChoix, data) => {
    const techs = selectedSkills?.join("_");

    const action = await dispatch(
      createQuestion({
        ...data,
        duree: Number(data.duree),
        note: Number(data.note),
        techs,
        testId: id,
        choix: listChoix,
      })
    );
    if (createQuestion.rejected.match(action)) {
      toast.error("une erreur s'est produite");
    } else {
      toast.success("Question crée avec succès");
      navigate(`/recruiter/test/${id}/questions`);
    }
  };
  const editQuestion = async (listChoix, data) => {
    const action = await dispatch(
      updateQuestion({
        ...data,
        duree: Number(data.duree),
        note: Number(data.note),
        testId: id,
        id: idq,
        choix: listChoix,
      })
    );
    if (updateQuestion.rejected.match(action)) {
      toast.error("une erreur s'est produite");
    } else {
      toast.success("Question modifiée avec succès");
      navigate(`/recruiter/test/${id}/questions`);
    }
  };


  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        style={{
          paddingTop: "10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h4" variant="h2" sx={{ pl: "30px" }}>
          {isCreateMode ? "Ajouter une question" : "Modifier la question :"}
          <Divider />
        </Typography>

        <Button variant="soft" type="submit" sx={{ width: "30ch" }}>
          Enregister
        </Button>
      </div>

      <div
        style={{
          height: "inherit",
          overflow: "auto",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <QuestionAndChoices
          error={error}
          setError={setError}
          choix={choix}
          setChoix={setChoix}
          register={register}
          errors={errors}
          unregister={unregister}
          watch={watch}
          setValue={setValue}
          getValues={getValues}
        />
        <QuestionInfos
          error={error}
          setError={setError}
          choix={choix}
          setChoix={setChoix}
          register={register}
          errors={errors}
          unregister={unregister}
          watch={watch}
          setValue={setValue}
          getValues={getValues}
        />
      </div>
    </form>
  );
}

export default QuestionForm;
