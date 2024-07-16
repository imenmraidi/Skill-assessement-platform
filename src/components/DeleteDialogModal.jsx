import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import { Dialog, DialogContent } from "@mui/material";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { deleteQuestion } from "../redux/slices/testsSlice";
import { deleteInvitation } from "../redux/slices/invitationsSlice";
import { deleteTest } from "../redux/slices/testsSlice";
import { useDispatch } from "react-redux";
import { Chip, Typography } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";

export default function DeleteDialogModal(props) {
  const { message, todelete } = props;
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deletequestion = async () => {
    const action = await dispatch(deleteQuestion({ idq: props.idq }));
    if (deleteQuestion.rejected.match(action)) {
      toast.error("Une erreur s'est produite")
    } else setOpen(false);
  };
  const deleteinvitation = async () => {
    const action = await dispatch(deleteInvitation({ idi: props.idi }));
    if (deleteInvitation.rejected.match(action)) {
       toast.error("Une erreur s'est produite")
    } else setOpen(false);
  };
  const deletetest = async () => {
    const action = await dispatch(deleteTest({ idt: props.idt }));
    if (deleteTest.rejected.match(action)) {
       toast.error("Une erreur s'est produite")
    } else {
      setOpen(false);
      toast.success("Test supprimé avec succès");
      navigate("/recruiter");
    }
  };
  return (
    <React.Fragment>
      <Chip
        size="md"
        variant="soft"
        color="danger"
        onClick={() => setOpen(true)}
      >
        <Typography startDecorator={<DeleteForever />} textColor="danger.400">
          Supprimer
        </Typography>
      </Chip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <Typography
            id="alert-dialog-modal-title"
            component="h2"
            startDecorator={<WarningRoundedIcon />}
          >
            Confirmation
          </Typography>
          <Divider />
          <Typography
            id="alert-dialog-modal-description"
            textColor="text.tertiary"
          >
            {message}
          </Typography>
          <Box
            sx={{ display: "flex", gap: 1, justifyContent: "flex-end", pt: 2 }}
          >
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
            <Button
              variant="solid"
              color="danger"
              onClick={() =>
                todelete === "q"
                  ? deletequestion()
                  : todelete === "i"
                  ? deleteinvitation()
                  : todelete === "t"
                  ? deletetest()
                  : undefined
              }
            >
              Supprimer
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
