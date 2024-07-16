import React, { Component, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signUp } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { Typography, Divider } from "@mui/joy";
import { InputAdornment, TextField, Fab } from "@mui/material";
import { red } from "@mui/material/colors";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm();
  const { status } = useSelector(state => state.auth);

  const onSubmit = async data => {
    const infos = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    
    const action = await dispatch(signUp( infos ));
    if (signUp.rejected.match(action)) {
      toast.error(action.payload, {
        position: "top-center",
        theme: "dark",
      });
    } else if (signUp.fulfilled.match(action)) {
      toast.success("compte crée !", {
        position: "top-center",
        theme: "dark",
      });
      navigate("/");
    }
  };

  return (
    <div className="signup">
      <Typography level="h4" textColor={"#021b44"}>
        Créer votre compte
      </Typography>
      <Divider sx={{ mr: 15, ml: 15, mt: 2 }} />
      <form
        style={{ display: "flex", flexDirection: "column", marginTop: "50px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
       
        <TextField
          sx={{ mt: 1, mb: 1, width: "45ch" }}
          error={errors.fullname ? true : false}
          id="fullname"
          InputProps={{
            startAdornment: (
              <InputAdornment
                sx={{ width: "45ch" }}
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
          sx={{ mt: 1, mb: 1, width: "45ch" }}
          error={errors.email ? true : false}
          id="email"
          InputProps={{
            startAdornment: (
              <InputAdornment
                sx={{ width: "45ch" }}
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
          sx={{ mt: 1, mb: 1, width: "45ch" }}
          error={errors.password ? true : false}
          id="password"
          type="password"
          InputProps={{
            startAdornment: (
              <InputAdornment
                sx={{ width: "45ch" }}
                disablePointerEvents
                position="start"
              >
                Mot de passe
              </InputAdornment>
            ),
          }}
          helperText={
            errors.password
              ? errors.password.message
              : "6 caractéres au minimum"
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
          sx={{ mt: 1, mb: 1, width: "45ch" }}
          error={errors.confpass ? true : false}
          id="confpass"
          type="password"
          InputProps={{
            startAdornment: (
              <InputAdornment
                sx={{ width: "45ch" }}
                disablePointerEvents
                position="start"
              >
                Confirmer le mot de passe
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

        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="add"
          type="submit"
          style={{ textTransform: "none" }}
          sx={{ mt: 2 }}
        >
          Créer mon compte
        </Fab>
      </form>
      <Typography level="body2" sx={{ mt: 2 }}>
        <Link style={{ textDecoration: "none" }} to={`/`}>
          Retour à la page de connexion
        </Link>
      </Typography>
    </div>
  );
}
