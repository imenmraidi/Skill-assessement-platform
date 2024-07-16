import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import {
  FormControl,
  Input,
  FormLabel,
  Typography,
  FormHelperText,
} from "@mui/joy";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/joy";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { updateInvitation } from "../redux/slices/invitationsSlice";
import dayjs from "dayjs";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";

export default function DeadlinePopper(props) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [error, setError] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const date = new Date(props.invit.dateLimite);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}/${month}/${day}`;
  const [dateLimite, setdateLimite] = React.useState(dayjs(formattedDate));

  const handleValider = async () => {
    if (isNaN(dateLimite)) return setError("Champ obligatoire");
    if (new Date(dateLimite) < new Date()) return setError("Date invalide");
    const action = await dispatch(
      updateInvitation({
        dateLimite: dateLimite.toISOString(),
        id: props.invit.id,
      })
    );
    if (updateInvitation.rejected.match(action)) {
      toast.error("Une erreur s'est produite");
    } else {
      toast.success("Date modifiée");
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
              <FormControl error={error ? true : false}>
                <FormLabel>Modifier la date d'expiration du test:</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs} required>
                  <DemoContainer components={["DatePicker"]} required>
                    <DatePicker
                      required
                      placeholderText="Select date"
                      format="YYYY/MM/DD"
                      onChange={date => setdateLimite(dayjs(date))}
                      defaultValue={dayjs(formattedDate)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <FormHelperText sx={{ ml: 0.5 }}>
                  {error ? error : null}
                </FormHelperText>
              </FormControl>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={handleValider} variant="outlined">
                  Valider
                </Button>
              </div>
            </Paper>
          </Fade>
        )}
      </Popper>
      <IconButton
        onClick={handleClick("bottom-start")}
        size="sm"
        sx={{ ml: 1 }}
      >
        <EditCalendarIcon />
      </IconButton>
    </Box>
  );
}
