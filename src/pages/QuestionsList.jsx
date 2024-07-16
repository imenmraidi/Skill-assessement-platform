import {
  Input,
  Slider,
  Button,
  Table,
  Chip,
  IconButton,
  Typography,
  Sheet,
  Textarea,
  Divider,
} from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import DeleteDialogModal from "../components/DeleteDialogModal";
import { Fragment, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

function QuestionsList() {
  const { tests, tetsStatus } = useSelector(state => state.tests);
  const { id } = useParams();
  const navigate = useNavigate();
  const test = tests && tests.find(t => t.id === id);
  const questions = test && test.questions.length !== 0 ? test.questions : [];
  const [search, setSearch] = useState("");
  return (
    <div className="questionsList">
      <div
        className="tete"
        style={{ display: "flex", flexDirection: "row", margin: "10px" }}
      >
        <Input
          sx={{ ml: 1, flex: 1, width: "50ch" }}
          placeholder="Recherche"
          variant="standard"
          startDecorator={<SearchIcon />}
          size="small"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Link to={"newquestion"}>
          <Button variant="outlined">Ajouter une question</Button>
        </Link>
      </div>
      <Table noWrap stickyHeader sx={{ overflow: "auto" }}>
        <thead>
          <tr>
            <th style={{ width: 40 }} aria-label="empty" />
            <th>Question</th>
            <th>Type</th>
            <th>Difficulté</th>
            <th>Durée</th>
            <th>Note</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {tetsStatus === "loading" ? (
            <div>"..."</div>
          ) : questions.length !== 0 ? (
            questions.map(q => {
              if (search) {
                if (
                  q.name.toLowerCase().includes(search) ||
                  q.type.toLowerCase().includes(search) ||
                  q.duree.toString().toLowerCase().includes(search) ||
                  q.note.toString().toLowerCase().includes(search) ||
                  q.difficulty.toLowerCase().includes(search)
                )
                  return <Row key={q.name} q={q} />;
                else return null;
              } else return <Row key={q.name} q={q} />;
            })
          ) : (
            <tr>
              <td colSpan={7}>Pas de questions dans ce test</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
function Row(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { q } = props;
  const [open, setOpen] = useState(false);
  let techs = "";
  if (q.techs) techs = q.techs.split("_");
  return (
    <>
      <tr>
        <td>
          <IconButton
            aria-label="expand row"
            variant="plain"
            color="neutral"
            size="sm"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </td>
        <td>{q.name}</td>
        <td>{q.type}</td>
        <td>
          <Chip variant="outlined" color="neutral">
            {q.difficulty}
          </Chip>
        </td>
        <td>{q.duree}min</td>

        <td>{q.note}pts</td>
        <td>
          <div style={{ display: "flex" }}>
            <IconButton
              onClick={() =>
                navigate(`/recruiter/test/${id}/questions/editquestion/${q.id}`)
              }
              color="neutral"
              variant="plain"
              size="sm"
              sx={{ mr: 1 }}
            >
              <EditIcon />
            </IconButton>
            <DeleteDialogModal
              idq={q.id}
              todelete="q"
              message="Êtes-vous sûr(e) de vouloir supprimer la question?"
            />
          </div>
        </td>
      </tr>
      <tr>
        <td style={{ height: 0, padding: 1 }} colSpan={7}>
          {open && (
            <Sheet
              variant="soft"
              sx={{
                p: 1,
                pl: 6,
                boxShadow: "inset 0 3px 6px 0 rgba(0 0 0 / 0.08)",
              }}
            >
              <Typography
                maxWidth={300}
                lineHeight="lg"
                level="body1"
                component="div"
              >
                {q.name.split("\n").map((line, index) => (
                  <Fragment key={index}>
                    {line}
                    <br />
                  </Fragment>
                ))}
              </Typography>
              <Divider sx={{ m: 1 }} />

              {q.type === "Text libre" ? (
                <Textarea
                  disabled
                  placeholder="Réponse..."
                  minRows={1}
                  sx={{ width: "60ch" }}
                />
              ) : (
                q.choix.map(c => {
                  return (
                    <Typography
                      sx={{ m: 1 }}
                      fontSize="sm"
                      startDecorator={
                        q.type === "Choix multiple" ? (
                          c.correctResponse === true ? (
                            <CheckBoxIcon fontSize="small" color="success" />
                          ) : (
                            <CheckBoxOutlineBlankIcon fontSize="small" />
                          )
                        ) : c.correctResponse === true ? (
                          <RadioButtonCheckedIcon
                            fontSize="small"
                            color="success"
                          />
                        ) : (
                          <RadioButtonUncheckedIcon fontSize="small" />
                        )
                      }
                    >
                      {c.name}
                    </Typography>
                  );
                })
              )}
            </Sheet>
          )}
        </td>
      </tr>
    </>
  );
}

export default QuestionsList;
