import { useSelector, useDispatch } from "react-redux";
import { closeSnackbar } from "../../store/snackbarSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const GlobalSnackbar = () => {
  const dispatch = useDispatch();
  const { message, open, severity } = useSelector((state) => state.snackbar);
  const handleClose = () => {
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
