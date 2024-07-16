import React, { Component, useState, useEffect } from "react";

import Skills from "./Skills";
import { Input, RadioGroup, Radio, FormLabel } from "@mui/joy";
import { FormControl, FormHelperText } from "@mui/material";

function QuestionInfos(props) {
  const { register, errors, watch } = props;
  return (
    <div
      style={{
        flexBasis: "50%",
        height: "inherit",
        overflow: "auto",
        padding: "0px 10px 0px 20px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <FormControl sx={{ mb: 2 }} error={errors.duree ? true : false}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <FormLabel sx={{ mr: 2, width: "6ch" }}>Durée :</FormLabel>
            <Input
              type="number"
              sx={{ width: "12ch" }}
              slotProps={{
                input: {
                  min: 1,
                  max: 5,
                  step: 1,
                },
              }}
              endDecorator="min"
              {...register("duree", {
                required: "Champ obligatoire",
              })}
            ></Input>
          </div>

          <FormHelperText sx={{ ml: 0 }}>
            {errors.duree ? errors.duree.message : null}
          </FormHelperText>
        </FormControl>
        <FormControl error={errors.note ? true : false}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <FormLabel sx={{ mr: 2, width: "6ch" }}>Note :</FormLabel>
            <Input
              type="number"
              sx={{ width: "12ch" }}
              slotProps={{
                input: {
                  min: 1,
                  max: 10,
                  step: 1,
                },
              }}
              endDecorator="pts"
              {...register("note", {
                required: "Champ obligatoire",
              })}
            ></Input>
          </div>
          <FormHelperText sx={{ ml: 0 }}>
            {errors.note ? errors.note.message : null}
          </FormHelperText>
        </FormControl>
      </div>
      <FormControl
        sx={{ mt: 4, width: "50ch" }}
        error={errors.difficulty ? true : false}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <FormLabel
            sx={{
              p: 0,
              display: "flex",
              alignItems: "flex-start",
              mr: 2,
            }}
          >
            Difficulté :
          </FormLabel>
          <RadioGroup
            orientation="vertical"
            {...register("difficulty", {
              required: "Sélectionner le niveau de difficulté de la question",
            })}
          >
            {["Facile", "Moyen", "Difficile"].map(i => {
              return (
                <Radio
                  checked={watch("difficulty") === i}
                  key={i}
                  value={i}
                  label={i}
                  {...register("difficulty")}
                />
              );
            })}
          </RadioGroup>
        </div>
        <FormHelperText sx={{ ml: 0 }}>
          {errors.difficulty ? errors.difficulty.message : null}
        </FormHelperText>
      </FormControl>
    </div>
  );
}

export default QuestionInfos;
