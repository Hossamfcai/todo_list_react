import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";

export default function Notification({ status }) {
  return (
    <Paper elevation={3} sx={{ borderRadius: "10px" }}>
      <Collapse in={status.state}>
        <Alert variant="filled" severity="success">
          {status.msg}
        </Alert>
      </Collapse>
    </Paper>
  );
}
