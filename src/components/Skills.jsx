import React, { Component, useEffect, useState } from "react";
import {
  Input,
  Slider,
  Button,
  Textarea,
  RadioGroup,
  Radio,
  Checkbox,
  Chip,
  Box,
  FormLabel,
} from "@mui/joy";
import { FormControl, FormHelperText } from "@mui/material";
import { pink, red } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
function Skills(props) {
  const { error, selectedSkills, setSelectedSkills } = props;
  const [skillsList, setSkillsList] = useState([
    ".Net",
    "Python",
    "CSS",
    "Android",
    "General coding",
    "Communication",
  ]);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    if (selectedSkills && selectedSkills.length !== 0)
      selectedSkills.forEach(s => {
        if (!skillsList.includes(s)) setSkillsList([...skillsList, s]);
      });
  });
  return (
    <div className="row2">
      <FormLabel sx={{ mt: 2, width: "50ch", fontSize: 16 }}>
        Compétences
      </FormLabel>
      <FormControl
        error={error && error.skills ? true : false}
        sx={{
          mt: 0.5,
          width: "100%",
        }}
      >
        <div
          className="row2-1"
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {skillsList.map(skill => {
            const checked = selectedSkills.includes(skill);
            return (
              <Chip
                size="sm"
                sx={{ m: 0.5 }}
                key={skill}
                variant={checked ? "soft" : "plain"}
                color={checked ? "neutral" : "neutral"}
                startDecorator={
                  checked && (
                    <CheckIcon sx={{ zIndex: 1, pointerEvents: "none" }} />
                  )
                }
              >
                <Checkbox
                  variant="outlined"
                  color={checked ? "neutral" : "neutral"}
                  disableIcon
                  overlay
                  label={skill}
                  checked={checked}
                  onChange={event => {
                    setSelectedSkills(skills =>
                      !event.target.checked
                        ? skills.filter(n => n !== skill)
                        : [...skills, skill]
                    );
                  }}
                />
              </Chip>
            );
          })}
        </div>
        <FormHelperText>
          {error && error.skills ? error.skills : null}
        </FormHelperText>
      </FormControl>
      <Input
        sx={{
          width: "35ch",
          "--Input-gap": "9px",
          "--Input-paddingInline": "13px",
          "--Input-radius": "9px",
          "--Input-placeholderOpacity": 0.6,
          "--Input-focusedThickness": "3px",
          "--Input-minHeight": "41px",
          "--Input-decoratorChildHeight": "33px",
        }}
        placeholder="Ajouter et selectionner d'autres"
        size="small"
        onChange={event => setNewSkill(event.target.value)}
        endDecorator={
          <Button
            variant="soft"
            color="primary"
            onClick={() =>
              setSkillsList(skills =>
                newSkill && !skills.includes(newSkill)
                  ? [...skills, newSkill]
                  : [...skills]
              )
            }
            sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          >
            <AddIcon />
          </Button>
        }
      />
    </div>
  );
}

export default Skills;
