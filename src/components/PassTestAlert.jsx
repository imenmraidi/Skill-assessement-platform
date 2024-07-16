import { Alert, Typography } from "@mui/joy";
import WarningIcon from "@mui/icons-material/Warning";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useState } from "react";
function PassTestAlert() {
  const [open, setOpen] = useState(true);
  const style = {
    position: "absolute",
    padding: "10px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <Modal open={true} onClose={() => setOpen(true)}>
        <Box sx={style}>
          <Alert
            sx={{ mb: 5 }}
            startDecorator={<WarningIcon sx={{ mx: 0.5 }} />}
            variant="soft"
            color="danger"
          >
            <Typography color="danger" level="h4" component="h2">
              Accès au test impossible !
            </Typography>
          </Alert>
          <div style={{ padding: "10px" }}>
            <Typography level="h6">
              Désolé, vous ne pouvez pas passer ce test pour des raisons possibles :
            </Typography>
            <ul>
            <li>
                <Typography level="body1">
                  Vous avez déjà passé le test.
                </Typography>
              </li>
              <li>
                <Typography level="body1">
                  Vous avez quitté le test une fois qu'il a commencé.
                </Typography>
              </li>
              <li>
                <Typography level="body1">L'invitation a expiré. </Typography>
              </li>
            </ul>
            <Typography level="body1">
              Veuillez contacter le propriétaire de l'évaluation pour obtenir
              des explications complémentaires.
            </Typography>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default PassTestAlert;
