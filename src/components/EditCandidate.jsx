import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import {
  Button,
  FormControl,
  Input,
  FormLabel,
  FormHelperText,
} from "@mui/joy";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Fab from "@mui/material/Fab";
import axiosAuth from "../axiosConfig";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar } from "@mui/material";

export default function EditCandidate(props) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    height: 750,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },setValue
  } = useForm();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fields = ["fullname", "email"];
    fields.forEach(field => props && setValue(field, props?.candidate[field]));
  }, [props.candidate]);

  const onSubmit = async data => {
    try {
      const response = await axiosAuth.put(`/candidate/${candidate.id}`, {
        email: data.email,
        fullname: data.fullname,
      });
      props.setCandidate(response.data);
      setOpen(false);
    } catch (error) {
      toast.error("Une erreur s'est produite");
    }
  };

  return (
    <div>
      <Button color="secondary" onClick={handleOpen}>
        hello
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          hello
          <div>
            <Avatar size="large" />
          </div>
          <div>
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
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
