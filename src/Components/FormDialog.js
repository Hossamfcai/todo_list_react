import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { DataContext, NotificationContext } from "../Contexts/DataContext";
import Slide from "@mui/material/Slide";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FormDialog({
  type,
  mission,
  open,
  handleClose,
  handleSubmit,
  handleDelete,
}) {
  const dataContext = useContext(DataContext);
  const notificationContext = useContext(NotificationContext);

  function showNotification(msg) {
    notificationContext.setNotificationState((prev) => {
      let newState = {
        state: !prev.state,
        msg: msg,
      };
      return newState;
    });

    setTimeout(() => {
      notificationContext.setNotificationState((prev) => {
        return { state: !prev.state, msg: prev.msg };
      });
    }, 1500);
  }
  return (
    <>
      {type === "update" && (
        <Dialog
          open={open}
          onClose={() => {
            handleClose();
          }}
          fullWidth={true}
          maxWidth="sm"
          slots={{
            transition: Transition,
          }}
        >
          <DialogTitle>Update Mission</DialogTitle>
          <DialogContent>
            <form
              onSubmit={(e) => {
                handleSubmit(e, mission.id);
                showNotification("Updated is successfully");
              }}
              id="subscription-form"
            >
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="mission"
                label="The mission"
                defaultValue={mission.mission}
                type="text"
                fullWidth
                variant="outlined"
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="details"
                label="Detials of mission"
                defaultValue={mission.details}
                type="text"
                fullWidth
                variant="outlined"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" form="subscription-form">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {type === "delete" && (
        <Dialog
          open={open}
          onClose={() => {
            handleClose();
          }}
          fullWidth={true}
          maxWidth="sm"
          slots={{
            transition: Transition,
          }}
        >
          <DialogTitle id="alert-dialog-title">
            {`Delete ${mission.mission}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`After confirmation, ${mission.mission} will be deleted`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Disagree
            </Button>
            <Button
              onClick={() => {
                handleDelete(mission.id);
                showNotification("The mission is deleted successfully");
              }}
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
