import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../store/snackbarSlice";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/router";
import IconHome from "@mui/icons-material/Home";
import SendIcon from '@mui/icons-material/Send';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [isStart, setIsStart] = React.useState(false);
  let scores = props.scores;
  const [phone, setPhone] = React.useState("+1");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  // Handle Open to open dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handle Close to close dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handle Send to set isStart true for sending in useEffect
  const handleSend = () => {
    setIsStart(true);
    console.log(isStart);
  };

  // Handle change for setting phone number from textfield value
  const handleChange = (event) => {
    setPhone(event.target.value);
  };
  const { user } = useUser();
  useEffect(() => {
    console.log(isStart);
    console.log(phone);
    // Send SMS if isStart is true
    if (isStart) {
      sendSms(user, scores);
      setIsStart(false);
      setOpen(false);
    }
  }, [isStart || ""]);

  /**
   * Function to Send Score via SMS from API
   * @param {user} user - LoggedIn User
   * @param {scores} user - LoggedIn User
   *
   */
  const sendSms = (user, scores) => {
    if (user) {
      setLoading(true);
      axios
        .post(`${process.env.API_URL}/sms/${phone}`, {
          phonenumber: phone,
          email: user.email,
          name: user.given_name || user.nickname,
          picture: user.picture,
          scores: scores,
        })
        .then((res) => {
          setLoading(false);
          dispatch(
            openSnackbar({
              message: "SMS Sent Successfully",
              severity: "success",
            })
          );
          console.log(res);
          console.log("SMS Sent SUCCESSFULLY");
        })
        .catch((err) => {
          setLoading(false);
          dispatch(
            openSnackbar({
              message: "Error Sending sms : " + err.message,
              severity: "error",
            })
          );
          console.log(err);
        });
    }
  };
  const handleRedirect = () => {
    router.push("/student/dashboard");
    setOpen(false);
  };
  return (
    <>
      <LoadingButton
        variant="outlined"
        onClick={handleClickOpen}
        color="warning"
        loading={loading}
        loadingPosition="start"
        endIcon={<SendIcon />}
      >
        SEND SCORE VIA PHONE NUMBER
      </LoadingButton>

      <Button variant="outlined" onClick={handleRedirect} endIcon={<IconHome />}>
        Exit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send Score</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To send score via phone number, please enter your phone number here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Phone Number"
            type="text"
            fullWidth
            variant="standard"
            value={phone}
            onChange={handleChange}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSend}>Send</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
