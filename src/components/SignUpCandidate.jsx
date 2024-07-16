import React from "react";
import {
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  RadioGroup,
  Radio,
  InputLabel,
  Input,
  InputAdornment,
  TextField,
} from "@mui/material";
import CommonSignUpInfo from "./CommonSignUpInfo";
export default function SignUpCandidate(props) {
  const { register, errors, watch } = props;
  return (
    <>
      <CommonSignUpInfo register={register} errors={errors} watch={watch} />
      <TextField
        sx={{ mt: 1, mb: 1, width: "50ch" }}
        error={errors.diploma ? true : false}
        id="diploma"
        InputProps={{
          startAdornment: (
            <InputAdornment
              sx={{ width: "40ch" }}
              disablePointerEvents
              position="start"
            >
              Formation
            </InputAdornment>
          ),
        }}
        helperText={errors.diploma ? errors.diploma.message : null}
        variant="standard"
        {...register("diploma", { required: "Champ obligatoire" })}
      />
      <TextField
        sx={{ mt: 1, mb: 1, width: "50ch" }}
        error={errors.skills ? true : false}
        id="skills"
        InputProps={{
          startAdornment: (
            <InputAdornment
              sx={{ width: "40ch" }}
              disablePointerEvents
              position="start"
            >
              Compétences
            </InputAdornment>
          ),
        }}
        multiline
        maxRows={2}
        helperText={errors.skills ? errors.skills.message : null}
        variant="standard"
        {...register("skills", { required: "Champ obligatoire" })}
      />
      <TextField
        sx={{ mt: 1, mb: 1, width: "50ch" }}
        error={errors.num ? true : false}
        id="num"
        type="number"
        InputProps={{
          startAdornment: (
            <InputAdornment
              sx={{ width: "40ch" }}
              disablePointerEvents
              position="start"
            >
              Tel
            </InputAdornment>
          ),
        }}
        helperText={errors.num ? errors.num.message : null}
        variant="standard"
        {...register("num", {
          required: "Champ obligatoire",
          pattern: {
            value: /^\d{8}$/,
            message: "Numéro invalide",
          },
        })}
      />
      <TextField
        sx={{ mt: 1, mb: 1, width: "50ch" }}
        error={errors.location ? true : false}
        id="location"
        InputProps={{
          startAdornment: (
            <InputAdornment
              sx={{ width: "40ch" }}
              disablePointerEvents
              position="start"
            >
              Adresse
            </InputAdornment>
          ),
        }}
        helperText={errors.location ? errors.location.message : null}
        variant="standard"
        {...register("location", { required: "Champ obligatoire" })}
      />
    </>
  );
}
