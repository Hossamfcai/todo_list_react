import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function AddForm({ handleAddMission }) {
  const [addMission, setAddMission] = useState({
    id: 1,
    mission: "",
    details: "",
    pending: true,
    completed: false,
  });
  const [disableBtn, setdisableBtn] = useState(true);
  function handleSubmit(e) {
    e.preventDefault();
    handleAddMission(addMission, "The mission is added");
  }
  function handleInput(e) {
    setAddMission({ ...addMission, mission: e.target.value });
    if (e.target.value.trim() === "") {
      setdisableBtn(true);
    } else {
      setdisableBtn(false);
    }
  }
  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Add Mission"
        variant="outlined"
        required
        size="medium"
        value={addMission.mission}
        onChange={(e) => {
          handleInput(e);
        }}
      />
      <Button
        onClick={(e) => {
          handleSubmit(e);
        }}
        variant="contained"
        size="medium"
        sx={{ lineHeight: "3.2" }}
        disabled={disableBtn}
      >
        Submit
      </Button>
    </Box>
  );
}
