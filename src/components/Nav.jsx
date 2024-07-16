import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Typography } from "@mui/joy";
import { green } from "@mui/material/colors";

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab
          component={Link}
          to={`questions`}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textTransform: "none",
          }}
          label="Questions"
        />
        <Tab
          component={Link}
          to={`candidats`}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textTransform: "none",
          }}
          label="Candidats"
        />
        <Tab
          component={Link}
          to={`statistics`}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textTransform: "none",
          }}
          label="Statistiques"
        />
        <Tab
          component={Link}
          to={`settings`}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textTransform: "none",
          }}
          label="Paramètres"
        />
      </Tabs>
    </Box>
  );
}
