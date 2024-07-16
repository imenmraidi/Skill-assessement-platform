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
import { updateCandidate } from "../redux/slices/invitationsSlice";

export default function EditCandidate(props) {
  const style = {
    position: "absolute",
    display: "flex",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 550,
    height: 300,
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
  } = useForm();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { candidates } = useSelector(state => state.invitations);
  const candidate = candidates.find(c => c.id === props.showInvit.candidateId);

  useEffect(() => {
    setValue("fullname", candidate.fullname);
    setValue("email", candidate.email);
  }, [props.showInvit]);

  const onSubmit = async data => {
    const action = await dispatch(
      updateCandidate({ ...data, id: candidate.id })
    );
    if (updateCandidate.rejected.match(action)) {
      toast.error("une erreur s'est poroduite");
    } else {
      toast.success("Informations modifiées");
      setOpen(false);
    }
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={handleOpen}
      >
      <EditOutlinedIcon />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div style={{ flexBasis: "30%" }}>
            <Avatar sx={{ width: 100, height: 100 }} />
          </div>            
          <div style={{ flexBasis: "70%" }}>
            <Typography level="h6">
              Modifier les informations du candidat :
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
