import logo from "../images/logo_soft.png";
import { Divider, Typography, Avatar } from "@mui/joy";
function HeaderPasserTest(props) {
  const { test } = props;
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        <Avatar src={logo} sx={{ width: 60, height: 60 }} variant="plain" />
        <div
          style={{
            marginRight: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Typography level="h3">{test?.name}</Typography>
          <Typography level="h5" textColor={"neutral.400"}>
            Test d'évaluation
          </Typography>
        </div>
      </div>
      <Divider />
    </>
  );
}

export default HeaderPasserTest;
