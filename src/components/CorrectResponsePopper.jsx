import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import {
  FormControl,
  Input,
  FormLabel,
  Typography,
  FormHelperText,
  Chip,
  Button,
} from "@mui/joy";
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/joy";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateTestResults } from "../redux/slices/invitationsSlice";
import { red } from "@mui/material/colors";

export default function CorrectResponsePopper(props) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [noteRepText, setNoteRepText] = React.useState(null);
  React.useEffect(() => {});
  const handleValider = async () => {
    const action = await dispatch(
      updateTestResults({
        id: props.id,
        points: Number(noteRepText),
      })
    );
    if (updateTestResults.rejected.match(action)) {
      toast.error("Une erreur s'est produite");
    } else {
      toast.success("Réponse évaluée");
      setOpen(false);
    }
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
            <Paper sx={{ p: 1 }}>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleValider();
                }}
              >
                <FormControl>
                  <FormLabel>Évaluer la réponse :</FormLabel>
                  <Input
                    required
                    onChange={e => setNoteRepText(e.target.value)}
                    type="number"
                    slotProps={{
                      input: {
                        min: 0,
                        max: props.q.note,
                        step: 1,
                      },
                    }}
                    sx={{
                      width: "50ch",
                      "--Input-focusedThickness": "0px",
                      "--Input-gap": "10px",
                      "--Input-minHeight": "40px",
                      "--Input-radius": "5px",
                      "--Input-paddingInline": "5px",
                      "--Input-decoratorChildHeight": "25px",
                    }}
                    startDecorator={"Note :"}
                    endDecorator={
                      <>
                        {"/ " + props.q.note}
                        <Button
                          type="submit"
                          sx={{
                            "--Button-radius": "5px",
                            ml: 1,
                          }}
                          variant="outlined"
                          size="sm"
                          color="danger"
                          style={{
                            color: red[500],
                          }}
                        >
                          Évaluer
                        </Button>
                      </>
                    }
                  />
                </FormControl>
              </form>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Chip
        size="md"
        sx={{ "--Chip-maxHeight": "30px" }}
        color="info"
        // style={{
        //   color: red[500],
        // }}
        variant="soft"
        onClick={handleClick("bottom-start")}
      >
        Évaluer
      </Chip>
    </Box>
  );
}
