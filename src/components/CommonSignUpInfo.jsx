import React from "react";
import { InputAdornment, TextField } from "@mui/material";
function CommonSignUpInfo(props) {
  const { register, errors, watch } = props;
  return (
    <>
      <TextField
        sx={{ mt: 1, mb: 1, width: "50ch" }}
        error={errors.fullname ? true : false}
        id="fullname"
        InputProps={{
          startAdornment: (
            <InputAdornment
              sx={{ width: "40ch" }}
              disablePointerEvents
              position="start"
            >
              Nom et prénom
            </InputAdornment>
          ),
        }}
        helperText={errors.fullname ? errors.fullname.message : null}
        variant="standard"
        {...register("fullname", { required: "Champ obligatoire" })}
      />
      <TextField
        sx={{ mt: 1, mb: 1, width: "50ch" }}
        error={errors.email ? true : false}
        id="email"
        InputProps={{
          startAdornment: (
            <InputAdornment
              sx={{ width: "40ch" }}
              disablePointerEvents
              position="start"
            >
              Email
            </InputAdornment>
          ),
        }}
        helperText={errors.email ? errors.email.message : null}
        variant="standard"
        {...register("email", {
          required: "Champ obligatoire",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Email non valide",
          },
        })}
      />
      <TextField
        sx={{ mt: 1, mb: 1, width: "50ch" }}
        error={errors.password ? true : false}
        id="password"
        type="password"
        InputProps={{
          startAdornment: (
            <InputAdornment
              sx={{ width: "40ch" }}
              disablePointerEvents
              position="start"
            >
              Mot de passe
            </InputAdornment>
          ),
        }}
        helperText={
          errors.password ? errors.password.message : "6 caractéres au minimum"
        }
        variant="standard"
        {...register("password", {
          required: "Champ obligatoire",
          minLength: {
            value: 6,
            message: "6 caractéres au minimum",
          },
        })}
      />
      <TextField
        sx={{ mt: 1, mb: 1, width: "50ch" }}
        error={errors.confpass ? true : false}
        id="confpass"
        type="password"
        InputProps={{
          startAdornment: (
            <InputAdornment
              sx={{ width: "40ch" }}
              disablePointerEvents
              position="start"
            >
              Confirmer mot de passe
            </InputAdornment>
          ),
        }}
        helperText={errors.confpass ? errors.confpass.message : null}
        variant="standard"
        {...register("confpass", {
          required: "Champ obligatoire",
          validate: value =>
            value === watch("password") ||
            "Les mots de passe ne correspondent pas",
        })}
      />
    </>
  );
}

export default CommonSignUpInfo;
