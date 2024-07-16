import React, { Component, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { Button, Textarea, RadioGroup, Radio, FormLabel } from "@mui/joy";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  FormControl,
  FormHelperText,
  TextField,
  IconButton,
} from "@mui/material";

function QuestionAndChoices(props) {
  const {
    error,
    setError,
    choix,
    setChoix,
    register,
    errors,
    unregister,
    watch,
    getValues,
  } = props;
  return (
    <div
      style={{
        flexBasis: "50%",
        height: "inherit",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        padding: "0px 0px 50px 30px",
      }}
    >
      <FormControl
        error={errors.name || error.choix ? true : false}
        sx={{ mt: 1, width: "80ch" }}
      >
        <FormLabel>Question :</FormLabel>
        <Textarea
          maxRows={5}
          minRows={3}
          {...register("name", {
            required: "Champ obligatoire",
          })}
        />
        <FormHelperText sx={{ ml: 0 }}>
          {errors.name ? errors.name.message : error.choix ? error.choix : null}
        </FormHelperText>
      </FormControl>
      <FormControl
        sx={{ mt: 2, width: "50ch" }}
        error={errors.type ? true : false}
      >
        <FormLabel>Type :</FormLabel>
        <RadioGroup
          sx={{ mt: 1 }}
          orientation="horizontal"
          {...register("type", {
            required: "Sélectionner le type de la question",
          })}
        >
          {["Choix multiple", "Choix unique", "Text libre"].map(i => {
            return (
              <Radio
                checked={watch("type") === i}
                key={i}
                value={i}
                label={i === "Text libre" ? "Ouverte" : i}
                {...register("type")}
              />
            );
          })}
        </RadioGroup>
        <FormHelperText sx={{ ml: 0 }}>
          {errors.type ? errors.type.message : null}
        </FormHelperText>
      </FormControl>
      {watch("type") !== "Text libre" && choix.length !== 0 ? (
        <FormLabel>Choix :</FormLabel>
      ) : null}
      {watch("type") !== "Text libre"
        ? choix.map(c => {
            return (
              <div key={uuid()}>
                <div key={uuid()} style={{ display: "flex" }}>
                  <>
                    <input
                      type={
                        watch("type") === "Choix unique" ? "radio" : "checkbox"
                      }
                      defaultChecked={
                        watch("type") === "Choix unique"
                          ? getValues("iscorrect") &&
                            getValues("iscorrect").includes(c)
                            ? true
                            : false
                          : undefined
                      }
                      name="iscorrect"
                      value={c}
                      {...register("iscorrect", {
                        required:
                          "Sélectionner la/(les) reponse(s) correcte(s)",
                      })}
                    />
                    <TextField
                      size="small"
                      sx={{ width: "65ch", ml: 1 }}
                      variant="outlined"
                      id={c}
                      {...register(`choix.${c}`, {
                        required: "Champ obligatoire",
                      })}
                    />
                    <IconButton
                      size="small"
                      onClick={() => {
                        setChoix(choix.filter(ch => ch !== c));
                        unregister(`choix.${c}`);
                      }}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </>
                </div>
                <div>
                  <FormHelperText sx={{ ml: 4 }} error>
                    {watch("type") !== "Text libre" && errors.choix
                      ? errors.choix[c]
                        ? errors.choix[c].message
                        : null
                      : null}
                  </FormHelperText>
                </div>
              </div>
            );
          })
        : null}
      {watch("type") === "Choix unique" ||
      watch("type") === "Choix multiple" ? (
        <>
          <Button
            sx={{ width: "20ch", mt: 2 }}
            type="button"
            onClick={() => {
              const id = uuid();
              setChoix([...choix, id]);
              if (error.choix)
                setError(p => {
                  return { ...p, choix: "" };
                });
            }}
          >
            + Choix
          </Button>

          <FormHelperText sx={{ ml: 0 }} error>
            {errors.iscorrect ? errors.iscorrect.message : null}
          </FormHelperText>
        </>
      ) : null}
    </div>
  );
}

export default QuestionAndChoices;
