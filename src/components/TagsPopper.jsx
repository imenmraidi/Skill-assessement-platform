import * as React from "react";
import Popper from "@mui/material/Popper";
import {
  Input,
  Button,
} from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/joy/Box";
import Checkbox from "@mui/joy/Checkbox";
import Chip from "@mui/joy/Chip";
import ChipDelete from "@mui/joy/ChipDelete";
import { updateInvitation } from "../redux/slices/invitationsSlice";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export default function TagsPopper(props) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [error, setError] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const [tags, setTags] = React.useState([
    "Contacté",
    "En attente",
    "À vérifier",
    "Prometteur",
    "Non qualifié",
  ]);
  const [selectedTags, setSelectedTags] = React.useState([]);
  React.useEffect(() => {
    setSelectedTags(props.invit.tags ? props.invit.tags.split("_") : []);
    if (props.invit.tags && props.invit.tags.split("_").length !== 0)
      props.invit.tags.split("_").forEach(s => {
        if (!tags.includes(s)) setTags([...tags, s]);
      });
  }, [props.invit]);
  const [newTag, setNewTag] = React.useState("");

  const handleValider = async () => {
    const action = await dispatch(
      updateInvitation({
        tags: selectedTags.length !== 0 ? selectedTags.join("_") : "",
        id: props.invit.id,
      })
    );
    if (updateInvitation.rejected.match(action)) {
      toast.error("Une erreur s'est produite")
    }

    setOpen(false);
  };
  const handleClick = newPlacement => event => {
    setAnchorEl(event.currentTarget);
    setOpen(prev => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <Box>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{ p: 1, width: 400 }}>
              {tags.map(tag => {
                const checked = selectedTags.includes(tag);
                return (
                  <Chip
                    key={tag}
                    sx={{ m: 0.5 }}
                    size="sm"
                    variant={checked ? "soft" : "plain"}
                    color={checked ? "primary" : "neutral"}
                    startDecorator={
                      checked && (
                        <CheckIcon
                          sx={{
                            zIndex: 1,
                            pointerEvents: "none",
                            fontSize: 18,
                          }}
                        />
                      )
                    }
                  >
                    <Checkbox
                      variant="outlined"
                      color={checked ? "primary" : "neutral"}
                      disableIcon
                      overlay
                      size="sm"
                      label={tag}
                      checked={checked}
                      onChange={event => {
                        setSelectedTags(tags =>
                          !event.target.checked
                            ? tags.filter(n => n !== tag)
                            : [...tags, tag]
                        );
                      }}
                    />
                  </Chip>
                );
              })}
              <div style={{ display: "flex" }}>
                <Input
                  sx={{
                    width: "35ch",
                    "--Input-gap": "9px",
                    "--Input-paddingInline": "13px",
                    "--Input-radius": "9px",
                    "--Input-placeholderOpacity": 0.6,
                    "--Input-focusedThickness": "3px",
                    "--Input-minHeight": "30px",
                    "--Input-decoratorChildHeight": "33px",
                    m: 1,
                  }}
                  placeholder="Ajouter et selectionner d'autres"
                  size="small"
                  onChange={event => setNewTag(event.target.value)}
                  endDecorator={
                    <Button
                      variant="soft"
                      color="primary"
                      onClick={() =>
                        setTags(tags =>
                          newTag && !tags.includes(newTag)
                            ? [...tags, newTag]
                            : [...tags]
                        )
                      }
                      sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                    >
                      <AddIcon sx={{ fontSize: 20 }} />
                    </Button>
                  }
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={handleValider} variant="outlined" color="info">
                  Valider
                </Button>
              </div>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Chip
        variant="plain"
        color="info"
        size="md"
        endDecorator={
          <ChipDelete
            color="info"
            variant="soft"
            onClick={handleClick("bottom-end")}
          >
            <AddIcon sx={{ fontSize: 20 }} />
          </ChipDelete>
        }
      >
        Tags
      </Chip>
    </Box>
  );
}
