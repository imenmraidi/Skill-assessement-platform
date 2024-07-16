import { Typography, Button, Divider } from "@mui/joy";
import TestForm from "../components/TestForm";
import DeleteDialogModal from "../components/DeleteDialogModal";
import { useParams } from "react-router-dom";
function Settings() {
  const { id } = useParams();

  return (
    <div
      style={{
        backgroundColor: "white",
        margin: "30px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        boxShadow:
          "2px 2px 5px rgba(0, 0, 0, 0.3),2px -2px 5px rgba(255, 255, 255, 0.3)",
      }}
    >
      <TestForm />
      <div style={{ margin: "50px 20px 20px 20px" }}>
        <Typography level="h5" variant="h2">
          Spprimer le test :
        </Typography>
        <Divider />
        <div
          style={{
            display: "flex",
            marginTop: "10px",
          }}
        >
          <Typography
            variant="soft"
            color="danger"
            startDecorator="🚨"
            fontSize="sm"
            sx={{ "--Typography-gap": "0.5rem", p: 1, mr: 1 }}
          >
            Attention! cette action est irreversible
          </Typography>
          <DeleteDialogModal
            todelete="t"
            idt={id}
            message="Êtes-vous sûr(e) de vouloir supprimer le test?"
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
