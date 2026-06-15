import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import "../styles/mission.css";
import IconButton from "@mui/material/IconButton";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { green, indigo, red } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import { useCallback, useContext, useState } from "react";
import { DataContext } from "../Contexts/DataContext";
import FormDialog from "./FormDialog";

export default function Mission({ mission, completeMission }) {
  const iconStyle = {
    bgcolor: "white",
    borderRadius: "50px",
    fontSize: "30px",
    padding: "3px",
    border: "2px solid",
  };
  const dataContext = useContext(DataContext);

  const [dialogType, setDialogType] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = useCallback(
    (event, id) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      let newArr = dataContext.missions.map((mission) => {
        if (mission.id === id) {
          mission = {
            ...mission,
            details: formJson.details,
            mission: formJson.mission,
          };
        }
        return mission;
      });

      dataContext.setMissions(newArr);
      localStorage.setItem("missions", JSON.stringify(newArr));

      handleClose();
    },
    [dataContext],
  );

  const handleDelete = useCallback(
    (id) => {
      let newArr = dataContext.missions.filter((mission) => {
        return mission.id !== id;
      });
      console.log(dataContext.missions);
      dataContext.setMissions(newArr);
      localStorage.setItem("missions", JSON.stringify(newArr));
      handleClose();
    },
    [dataContext],
  );

  return (
    <>
      <Paper elevation={3} sx={{ borderRadius: "10px", marginTop: "10px   " }}>
        <Stack
          spacing={2}
          className="mission"
          direction="row"
          sx={{ bgcolor: "primary.main" }}
        >
          <Stack sx={{ width: "100%" }}>
            <Box sx={{ width: "100%", textAlign: "start" }}>
              <span style={{ fontSize: "20px" }}>{mission.mission}</span>
            </Box>
            {mission.details && (
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "200",
                  width: "100%",
                  textAlign: "start",
                }}
              >
                {mission.details}
              </span>
            )}
          </Stack>
          <Stack
            spacing={2}
            direction="row"
            sx={{ width: "45%", alignItems: "center", justifyContent: "end" }}
          >
            <IconButton
              onClick={() => {
                completeMission(mission.id);
              }}
            >
              <CheckOutlinedIcon
                sx={
                  mission.completed && !mission.pending
                    ? {
                        ...iconStyle,
                        color: "white",
                        backgroundColor: green[500],
                      }
                    : {
                        ...iconStyle,
                        color: green[500],
                        transition: "all 0.3s ease", // Smooth transition
                        "&:hover": {
                          backgroundColor: green[500], // Background color on hover
                          color: "white", // Icon color on hover
                        },
                      }
                }
              />
            </IconButton>
            <IconButton
              onClick={() => {
                setDialogType("update");
                handleClickOpen();
              }}
            >
              <CreateOutlinedIcon
                sx={{
                  ...iconStyle,
                  color: indigo[500],
                  transition: "all 0.3s ease", // Smooth transition
                  "&:hover": {
                    backgroundColor: indigo[500], // Background color on hover
                    color: "white", // Icon color on hover
                  },
                }}
              />
            </IconButton>
            <IconButton
              onClick={() => {
                setDialogType("delete");
                handleClickOpen();
              }}
            >
              <DeleteOutlinedIcon
                sx={{
                  ...iconStyle,
                  color: red[500],
                  transition: "all 0.3s ease", // Smooth transition
                  "&:hover": {
                    backgroundColor: red[500], // Background color on hover
                    color: "white", // Icon color on hover
                  },
                }}
              />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
      <FormDialog
        type={dialogType}
        mission={mission}
        open={open}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        handleClose={handleClose}
      />
    </>
  );
}
