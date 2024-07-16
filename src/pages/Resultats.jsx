import { Box, Rating } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderPasserTest from "../components/HeaderPasserTest";
import { Typography, Divider } from "@mui/joy";
import axios from "axios";
function Resultats() {
  const location = useLocation();
  const invit = location.state?.invit;
  const [score, setScore] = useState();
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/invitations/invitId/${invit.id}`
        );
        setScore(response.data.pourcentage);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const [open, setOpen] = useState(true);
  console.log(score);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <HeaderPasserTest />
      <Modal open={open} onClose={() => setOpen(true)}>
        <Box sx={style}>
          <Typography level="h4" sx={{ mt: 2, mb: 2 }}>
            Merci ! Votre score est de {score}%
          </Typography>
          <Typography level="body1" fontSize={18}>
            Vos réponses ouvertes seront maintenant examinées par un évaluateur
            qualifié. Si vous êtes sélectionné pour la prochaine étape, vous
            serez informé de cette excellente nouvelle dans les plus brefs
            délais.
          </Typography>
          <Typography level="h6" sx={{ mt: 2, mb: 3 }}>
            Merci pour votre participation !
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Resultats;
