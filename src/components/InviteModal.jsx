import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InfoIcon from "@mui/icons-material/Info";
import { toast } from "react-toastify";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import {
  Button,
  Divider,
  FormControl,
  Input,
  FormLabel,
  Typography,
  FormHelperText,
  IconButton,
  Textarea,
  Alert,
} from "@mui/joy";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import Chip from "@mui/joy/Chip";
import ChipDelete from "@mui/joy/ChipDelete";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createInvitation } from "../redux/slices/testsSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 750,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

export default function InviteModal(props) {
  const { test } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    getValues,
  } = useForm();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [emails, setEmails] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState({ email: "", emails: "" });

  const [emailbody, setEmailBody] = useState(`Bonjour,

  Nous avons le plaisir de vous informer que vous avez été sélectionné(e) pour la deuxième étape de notre processus de recrutement. Félicitations !
  Dans le cadre de cette étape, nous aimerions vous inviter à passer un test en ligne qui évaluera vos compétences pour le poste. Vous pouvez accéder au test en cliquant sur le lien ci-dessous.
      
  Test: 
  Durée du test: 
  Date d'expiration:
      
  Assurez vous de planifier votre test à une date qui convient à votre emploi du temps et de terminer le test avant la date d'expiration.
      
  Bien cordialement,`);

  useEffect(() => {
    setValue("objet", "Invitation de test d'aumbauche en ligne");
  }, []);
  const onSubmit = async data => {
    if (test.questions.length === 0)
      return toast.error("Erreur: pas de questions dans ce test");
    else if (emails.length === 0)
      setError(p => {
        return {
          ...p,
          emails: "Selectionnez le(s) email(s) de(s) candidat(s)",
        };
      });
    else {
      data = {
        ...data,
        emailbody,
        emails,
        testId: test.id,
        dateLimite: dayjs(data.dateLimite).toISOString(),
      };
      const action = await dispatch(createInvitation(data));
      if (createInvitation.rejected.match(action)) {
        toast.error("Une erreur s'est produite");
      } else {
        toast.success("Candidats invités avec succès !");
        setOpen(false);
      }
    }
  };
  return (
    test && (
      <div>
        <Button
          onClick={handleOpen}
          sx={{ width: "160px" }}
          size="sm"
          variant="soft"
        >
          Inviter des candidats
        </Button>

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <div style={{ display: "flex" }}>
              <Typography level="h4" variant="h2">
                {test.name}
              </Typography>
              <Divider orientation="vertical" sx={{ m: 1 }} />
              <Typography level="h4" variant="h2">
                Inviter des candidats :
              </Typography>
            </div>
            <Divider sx={{ mb: 2 }} />

            <Alert color="info" startDecorator={<InfoIcon />}>
              Veuillez noter que si vous invitez un candidat qui a été invité et
              a passé ce test, ses résultats précédents seront perdus.
            </Alert>

            <form onSubmit={handleSubmit(onSubmit)}>
              <FormLabel sx={{ fontSize: 16, mb: 1, mt: 1 }}>
                Emails des candidats :
              </FormLabel>
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "16px ",
                }}
              >
                <FormControl
                  error={error.email ? true : error.emails ? true : false}
                >
                  <Input
                    error={error.email ? true : false}
                    sx={{
                      width: "70ch",
                      "--Input-gap": "9px",
                      "--Input-paddingInline": "13px",
                      "--Input-radius": "9px",
                      "--Input-placeholderOpacity": 0.6,
                      "--Input-focusedThickness": "3px",
                      "--Input-minHeight": "41px",
                      "--Input-decoratorChildHeight": "33px",
                    }}
                    placeholder="Ajouter l'email d'un candidat"
                    size="small"
                    value={newEmail}
                    onChange={event => {
                      setNewEmail(event.target.value);
                      setError(e => {
                        return {
                          ...e,
                          email: !(/^[^\s@]+@[^\s@]+\.[a-zA-Z0-9]+$/.test(
                            event.target.value
                          ))
                            ? "Email invalide"
                            : "",
                        };
                      });
                    }}
                    endDecorator={
                      <Button
                        variant="soft"
                        onClick={() => {
                          if (!error.email) {
                            setEmails(emails =>
                              newEmail && !emails.includes(newEmail)
                                ? [...emails, newEmail]
                                : [...emails]
                            );
                            setNewEmail("");
                          }
                        }}
                      >
                        <AddIcon />
                      </Button>
                    }
                  />
                  <FormHelperText sx={{ ml: 0 }}>
                    {error.email
                      ? error.email
                      : error.emails
                      ? error.emails
                      : null}
                  </FormHelperText>
                </FormControl>

                {emails &&
                  emails.map(e => {
                    return (
                      <Chip
                        sx={{ m: 0.7, ml: 0 }}
                        key={e}
                        size="md"
                        variant="soft"
                        color="neutral"
                        endDecorator={
                          <ChipDelete
                            onDelete={() =>
                              setEmails(emails.filter(m => m !== e))
                            }
                          />
                        }
                      >
                        {e}
                      </Chip>
                    );
                  })}
              </div>
              <FormControl error={errors.dateLimite ? true : false}>
                <FormLabel sx={{ fontSize: 16, mb: 1, mt: 1 }}>
                  Date d'expiration de l'invitation :
                </FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs} required>
                  <DemoContainer components={["DatePicker"]} required>
                    <Controller
                      required
                      control={control}
                      name="dateLimite"
                      rules={{
                        required: "Champ obligatoire",
                        validate: value => {
                          if (new Date(value) < new Date()) {
                            return "Date Limite invalide";
                          }
                          return true;
                        },
                      }}
                      render={({ field }) => (
                        <DatePicker
                          required
                          placeholderText="Select date"
                          onChange={date => field.onChange(date)}
                          selected={field.value}
                          format="YYYY/MM/DD"
                          setValueAs={value => value || ""}
                        />
                      )}
                    />
                  </DemoContainer>
                </LocalizationProvider>

                <FormHelperText sx={{ ml: 0.5 }}>
                  {errors.dateLimite ? errors.dateLimite.message : null}
                </FormHelperText>
              </FormControl>
              <Typography level="h6" variant="h2" sx={{ mt: 2 }}>
                Email de l'invitation :
              </Typography>
              <Divider />
              <FormControl error={errors.emailexped ? true : false}>
                <FormLabel sx={{ fontSize: 16, mb: 1, mt: 1 }}>De :</FormLabel>
                <Input
                  required
                  placeholder="email@gmail.com"
                  error={errors.emailexped ? true : false}
                  {...register("emailexped", {
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email non valide",
                    },
                  })}
                ></Input>
                <FormHelperText sx={{ ml: 0.5 }}>
                  {errors.emailexped ? errors.emailexped.message : null}
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel sx={{ fontSize: 16, mb: 1, mt: 1 }}>
                  Objet :
                </FormLabel>
                <Input
                  required
                  placeholder="Invitation de test d'aumbauche en ligne"
                  error={errors.objet ? true : false}
                  {...register("objet")}
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel sx={{ fontSize: 16, mb: 1, mt: 1 }}>
                  Corps de l'email :
                </FormLabel>
                <Textarea
                  required
                  value={emailbody}
                  onChange={event => setEmailBody(event.target.value)}
                />
              </FormControl>
              <Button
                variant="soft"
                type="submit"
                size="lg"
                fullWidth
                sx={{ mt: 1 }}
              >
                Inviter
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    )
  );
}
