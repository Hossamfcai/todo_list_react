import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Mission from "./Mission";
import { useState } from "react";
import AddForm from "./AddForm";
import Paper from "@mui/material/Paper";
import Notification from "./Notification";
import Box from "@mui/material/Box";
import { TransitionGroup } from "react-transition-group";
import { DataContext } from "../Contexts/DataContext";
import Collapse from "@mui/material/Collapse";

export default function TodoList() {
  let data = JSON.parse(localStorage.getItem("missions"));
  const [missions, setMissions] = useState(data);
  const [filter, setFilter] = useState("all");
  const [alignment, setAlignment] = useState("left");
  const [notificationState, setNotificationState] = useState({
    state: false,
    msg: "",
  });

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  function completeMission(id) {
    let targetMission = {};

    let newArr = missions.map((mission) => {
      if (mission.id === id) {
        mission.pending = !mission.pending;
        mission.completed = !mission.completed;
        targetMission = mission;
      }
      console.log(targetMission);
      return mission;
    });

    setMissions(newArr);
    localStorage.setItem("missions", JSON.stringify(newArr));

    setNotificationState((prev) => {
      console.log(targetMission.completed);
      let newState = {
        state: !prev.state,
        msg:
          targetMission.completed && !targetMission.pending
            ? "Successfully the mission is completed"
            : "Successfully the mission is pending",
      };
      return newState;
    });

    setTimeout(() => {
      setNotificationState((prev) => {
        return { state: !prev.state, msg: prev.msg };
      });
    }, 1500);
  }

  function handleAddMission(mission, msg) {
    let newArray = [...missions];
    newArray.push({ ...mission, id: Math.random() });
    console.log(newArray);
    setMissions(newArray);
    localStorage.setItem("missions", JSON.stringify(newArray));

    setNotificationState((prev) => {
      let newState = {
        state: !prev.state,
        msg: msg,
      };
      return newState;
    });

    setTimeout(() => {
      setNotificationState((prev) => {
        return { state: !prev.state, msg: prev.msg };
      });
    }, 1500);
  }

  // eslint-disable-next-line array-callback-return
  const filterData = missions.filter((mission) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed" && mission.completed === true) {
      return true;
    } else if (filter === "pending" && mission.pending === true) {
      return true;
    }
  });
  console.log(filterData);
  return (
    <DataContext.Provider
      value={{ missions, setMissions, notificationState, setNotificationState }}
    >
      <>
        <Paper elevation={3} sx={{ borderRadius: "10px" }}>
          <Container
            maxWidth="sm"
            sx={{ bgcolor: "white", borderRadius: "10px", padding: "15px 0px" }}
          >
            <Stack spacing={3}>
              <h2
                style={{
                  borderBottom: "1px solid",
                  marginTop: "30px",
                  paddingBottom: "20px",
                }}
              >
                Missions
              </h2>
              <Stack
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ToggleButtonGroup
                  color="primary"
                  value={alignment}
                  exclusive
                  onChange={handleAlignment}
                  aria-label="text alignment"
                >
                  <ToggleButton
                    value="left"
                    aria-label="left aligned"
                    onClick={() => {
                      setFilter("all");
                    }}
                  >
                    All
                  </ToggleButton>
                  <ToggleButton
                    value="center"
                    aria-label="centered"
                    onClick={() => {
                      setFilter("completed");
                    }}
                  >
                    Completed
                  </ToggleButton>
                  <ToggleButton
                    value="right"
                    aria-label="right aligned"
                    onClick={() => {
                      setFilter("pending");
                    }}
                  >
                    Pending
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>
              <TransitionGroup>
                {filterData.map((mission, i) => {
                  return (
                    <Collapse>
                      <Mission
                        key={i}
                        mission={mission}
                        completeMission={completeMission}
                      />
                    </Collapse>
                  );
                })}
              </TransitionGroup>
              <AddForm handleAddMission={handleAddMission} />
            </Stack>
          </Container>
        </Paper>

        <Box
          sx={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            zIndex: "1",
          }}
        >
          <Notification status={notificationState} />
        </Box>
      </>
    </DataContext.Provider>
  );
}
