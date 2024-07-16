import AspectRatio from "@mui/joy/AspectRatio";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import { CardOverflow, Divider } from "@mui/joy";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { useDispatch, useSelector } from "react-redux";
import EditNotificationsRoundedIcon from "@mui/icons-material/EditNotificationsRounded";
import Tooltip from "@mui/joy/Tooltip";
import { Button } from "@mui/material";

function CandidateCard(props) {
  const dispatch = useDispatch();
  const { candidates } = useSelector(state => state.invitations);
  const { invit, test, showInvit, setShowInvit, questions } = props;
  const candidate = candidates.find(c => c.id === invit.candidateId);
  const pourcentage = invit.pourcentage;
  const quetsionstoevaluate = invit.testResults.filter(
    r => r.points === null
  ).length;

  return (
    test &&
    invit &&
    questions &&
    candidates && (
      <Card
        onClick={() => {
          setShowInvit({ id: invit.id, candidateId: candidate.id });
        }}
        variant="outlined"
        sx={{
          p: 3,
          m: 1,
          minHeight: 120,
          overflowY: "auto",
          boxSizing: "border-box",
          "--Card-radius": "0px",
          boxShadow: showInvit && showInvit.id === invit.id ? "md" : "sm",
          borderColor:
            showInvit && showInvit.id === invit.id
              ? "neutral.outlinedHoverBorder"
              : undefined,
          "&:hover": {
            boxShadow: "md",
            borderColor: "neutral.outlinedHoverBorder",
          },
          bgcolor:
            showInvit && showInvit.id === invit.id
              ? "background.level3"
              : undefined,
        }}
      >
        <CardOverflow>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                level="h2"
                fontSize="lg"
                id="card-description"
                mb={0.5}
              >
                {candidate?.fullname}
              </Typography>
              {quetsionstoevaluate && quetsionstoevaluate !== 0 ? (
                <Tooltip
                  title={
                    quetsionstoevaluate > 1
                      ? quetsionstoevaluate + " questions non évaluées"
                      : quetsionstoevaluate + " question non évaluée"
                  }
                  style={{ zIndex: 1 }}
                >
                  <div>
                    <Chip variant="soft" color="info" size="sm">
                      <EditNotificationsRoundedIcon />
                    </Chip>
                  </div>
                </Tooltip>
              ) : null}
            </div>

            <Typography
              fontSize="sm"
              aria-describedby="card-description"
              mb={1}
            >
              <Link overlay underline="none" sx={{ color: "text.tertiary" }}>
                {candidate?.email}
              </Link>
            </Typography>
            <Chip
              variant="soft"
              color={
                !invit.testPassed
                  ? "neutral"
                  : pourcentage >= test.notepassage
                  ? "success"
                  : pourcentage < test.notepassage &&
                    pourcentage >= test.notepassage - 5
                  ? "warning"
                  : "danger"
              }
              size="md"
              sx={{ pointerEvents: "none" }}
            >
              <Typography
                textColor={
                  invit.testPassed === false
                    ? "neutral.400"
                    : pourcentage >= test.notepassage
                    ? "success.300"
                    : pourcentage < test.notepassage &&
                      pourcentage >= test.notepassage - 5
                    ? "warning.300"
                    : "danger.400"
                }
              >
                {invit.testPassed === true
                  ? pourcentage.toFixed(0) + "%"
                  : "Non évalué"}
              </Typography>
            </Chip>
            {invit.tags && invit.tags.length !== 0
              ? invit.tags.split("_").map(t => {
                  return (
                    <Chip
                      key={t}
                      sx={{ m: 0.5 }}
                      variant="soft"
                      color="neutral"
                      size="md"
                      startDecorator={<LocalOfferOutlinedIcon fontSize="18" />}
                    >
                      {t}
                    </Chip>
                  );
                })
              : null}
          </div>
        </CardOverflow>
      </Card>
    )
  );
}

export default CandidateCard;
