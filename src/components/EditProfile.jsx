import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import {
  Button,
  FormControl,
  Input,
  FormLabel,
  FormHelperText,
  Typography,
} from "@mui/joy";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Fab from "@mui/material/Fab";
import axiosAuth from "../axiosConfig";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Avatar } from "@mui/material";
import { updateRecruiter } from "../redux/slices/authSlice";

export default function EditProfile() {
  const style = {
    position: "absolute",
    display: "flex",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 650,
    height: 470,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    setValue("fullname", userInfo.fullname);
    setValue("email", userInfo.email);
  }, []);

  const onSubmit = async data => {
    delete data.confmdp;
    const action = await dispatch(updateRecruiter(data));
    if (updateRecruiter.rejected.match(action)) {
      toast.error("Une erreur s'est produite");
    } else {
      toast.success("Informations modifiées");
    }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="extended">
        Profil
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div style={{ flexBasis: "30%" }}>
            <Avatar sx={{ width: 100, height: 100 }} />
          </div>
          <div style={{ flexBasis: "70%" }}>
            <Typography level="h6">
              Modifier les informations de votre profil :
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl error={errors.fullname ? true : false}>
                <FormLabel sx={{ fontSize: 16, mb: 1, mt: 1 }}>
                  Nom et prénom :
                </FormLabel>
                <Input
                  error={errors.fullname ? true : false}
                  {...register("fullname", {
                    required: "Champ obligatoire",
                  })}
                />
                <FormHelperText sx={{ ml: 0 }}>
                  {errors.fullname ? errors.fullname.message : null}
                </FormHelperText>
              </FormControl>
              <FormControl error={errors.email ? true : false}>
                <FormLabel sx={{ fontSize: 16, mb: 1, mt: 1 }}>
                  email :
                </FormLabel>
                <Input
                  error={errors.email ? true : false}
                  {...register("email", {
                    required: "Champ obligatoire",
                  })}
                />
                <FormHelperText sx={{ ml: 0 }}>
                  {errors.email ? errors.email.message : null}
                </FormHelperText>
              </FormControl>
              <FormControl error={errors.mdp ? true : false}>
                <FormLabel sx={{ fontSize: 16, mb: 1, mt: 1 }}>
                  Nouveau mot de passe :
                </FormLabel>
                <Input
                  error={errors.mdp ? true : false}
                  {...register("mdp", {
                    minLength: {
                      value: 6,
                      message: "6 caractéres au minimum",
                    },
                  })}
                />
                <FormHelperText sx={{ ml: 0 }}>
                  {errors.mdp ? errors.mdp.message : null}
                </FormHelperText>
              </FormControl>
              <FormControl error={errors.confmdp ? true : false}>
                <FormLabel sx={{ fontSize: 16, mb: 1, mt: 1 }}>
                  Confirmer le mot de passe :
                </FormLabel>
                <Input
                  error={errors.confmdp ? true : false}
                  {...register("confmdp", {
                    validate: value =>
                      value === watch("mdp") ||
                      "Les mots de passe ne correspondent pas",
                  })}
                />
                <FormHelperText sx={{ ml: 0 }}>
                  {errors.confmdp ? errors.confmdp.message : null}
                </FormHelperText>
              </FormControl>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button type="submit" variant="outlined" color="primary">
                  Valider
                </Button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  );
}
