import { useState } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../store/snackbarSlice";
import Tooltip from "@mui/material/Tooltip";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const UpdateQuestion = ({ id, testId, data, setData }) => {
  const [open, setOpen] = useState(false);

  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    options: [""],
    type: "",
    answer: "",
    marks: "",
  });

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleClickOpen = (id) => {
    setEditFormData(data.find((item) => item._id === id));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateData = () => {
    setLoading(true);
    axios
      .put(`${process.env.API_URL}/tests/${testId}/questions/${id}`, editFormData)
      .then((res) => {
        setData(
          data.map((item) =>
            item._id === editFormData._id ? editFormData : item
          )
        );
        setLoading(false);
        setOpen(false);
        dispatch(
          openSnackbar({
            message: "Test Updated Successfully",
            severity: "success",
          })
        );
      })
      .catch((err) => {
        setLoading(false);
        dispatch(
          openSnackbar({
            message: "Error Updating Test : " + err.message,
            severity: "error",
          })
        );
      });
  };
  return (
    <>
      <IconButton
        aria-label="edit"
        color="secondary"
        onClick={() => handleClickOpen(id)}
      >
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>Edit Question</Box>
            <Box>
              <IconButton
                aria-label="cancel"
                color="error"
                onClick={handleClose}
              >
                <CancelIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "50ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-title"
                label="Title"
                value={editFormData.title}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <TextField
                id="outlined-description"
                label="Description"
                value={editFormData.description}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div>
              {editFormData.options.map((option, index) => (
                <div key={index}>
                  <Tooltip title="Remove Option" arrow>
                    <IconButton
                      aria-label="remove-option"
                      color="error"
                      disabled={index === 0}
                      onClick={() => {
                        setEditFormData({
                          ...editFormData,
                          options: editFormData.options.filter(
                            (option, i) => index !== i
                          ),
                        });
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Tooltip>
                  <TextField
                    id="outlined-option"
                    label={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        options: editFormData.options.map((option, i) =>
                          i === index ? e.target.value : option
                        ),
                      })
                    }
                  />
                </div>
              ))}
              <Tooltip title="Add Option" arrow>
                <IconButton
                  disabled={
                    editFormData.options[
                      editFormData.options.length - 1
                    ] === ""
                  }
                  aria-label="add-option"
                  color="success"
                  onClick={() => {
                    setEditFormData({
                      ...editFormData,
                      options: [...editFormData.options, ""],
                    });
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div>
              <TextField
                id="outlined-type"
                label="Type"
                value={editFormData.type}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    type: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <TextField
                id="outlined-answer"
                label="Answer"
                value={editFormData.answer}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    answer: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <TextField
                id="outlined-marks"
                label="Marks"
                type="number"
                value={editFormData.marks}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    marks: e.target.value,
                  })
                }
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <LoadingButton
              color="secondary"
              onClick={updateData}
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
            >
              Save
            </LoadingButton>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateQuestion;
