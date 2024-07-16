import React, { Component, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { Fab, TextField } from "@mui/material";
import { Typography, Divider } from "@mui/joy";
import { getRecruiter } from "../redux/slices/authSlice";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async data => {
    const action = await dispatch(
      login({ email: data.email, password: data.password, role: "recruiter" })
    );
    if (login.rejected.match(action)) {
      toast.error(
        action.payload.response.status === 500
          ? "une erreur s'est prosuite essayez ultérieurement"
          : action.payload.response.data,
        {
          position: "top-center",
          theme: "dark",
        }
      );
    } else {
      navigate(`/recruiter`, {
        replace: true,
      });
    }
  };
  return (
    <div className="login">
      <Typography level="h4" textColor={"#021b44"}>
        Se connecter
      </Typography>
      <Divider sx={{ mr: 15, ml: 15, mt: 2 }} />
      <form
        style={{ display: "flex", flexDirection: "column", marginTop: "50px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          error={errors.email ? true : false}
          id="email"
          size="small"
          label="Email"
          sx={{ mt: 2, mb: 2, width: "40ch" }}
          helperText={errors.email ? errors.email.message : null}
          variant="standard"
          {...register("email", {
            required: "Champ obligatoire",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email invalide",
            },
          })}
        />

        <TextField
          error={errors.password ? true : false}
          id="password"
          type="password"
          label="Mot de passe"
          size="small"
          sx={{ mt: 2, mb: 2, width: "40ch" }}
          helperText={errors.password ? errors.password.message : null}
          variant="standard"
          {...register("password", {
            required: "Champ obligatoire",
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
          Se connecter
        </Fab>
      </form>
      <Typography level="body2" sx={{ mt: 2 }}>
        Vous n'avez pas de compte?{" "}
        <Link style={{ textDecoration: "none" }} to={`/signup`}>
          Créer un compte
        </Link>
      </Typography>
    </div>
  );
}
