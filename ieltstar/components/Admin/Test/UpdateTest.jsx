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
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../store/snackbarSlice";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const UpdateTest = ({ id, data, setData }) => {
  const [open, setOpen] = useState(false);

  const [editFormData, setEditFormData] = useState({});

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
      .put(`${process.env.API_URL}/tests/${editFormData._id}`, editFormData)
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
            <Box flexGrow={1}>Edit Exam</Box>
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
                type="number"
                id="outlined-required"
                label="Section"
                value={editFormData.section}
                onChange={(e) =>
                    setEditFormData({
                    ...editFormData,
                    section: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <TextField
                id="create-outlined-select-type"
                select
                label="Category"
                value={editFormData.category}
                onChange={(e) =>
                    setEditFormData({
                    ...editFormData,
                    category: e.target.value,
                  })
                }
                helperText="Please select test category"
              >
                {["Reading", "Listening", "Writing", "Speaking"].map(
                  (option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </TextField>
            </div>
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: '5px'}}>
            {editFormData.category === "Listening" ? (
                <TextField
                  type="text"
                  id="outlined-required"
                  label="Source"
                  value={editFormData.source}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      source: e.target.value,
                    })
                  }
                />
              ) : (
                <SunEditor
                  defaultValue={editFormData.source}
                  setDefaultStyle="width: 50ch; height: 200px;border-radius: 5px;"
                  onChange={(e) =>
                    setEditFormData((editFormData) => ({
                      ...editFormData,
                      source: e,
                    }))
                  }
                />
              )}
              <p style={{alignSelf: 'flex-start'}} className="MuiFormHelperText-root MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled mui-style-xzkq1u-MuiFormHelperText-root">
                Source
              </p>
            </div>
            <div>
              <TextField
                id="Instruction-outlined"
                label="Instruction"
                value={editFormData.instruction}
                multiline
                onChange={(e) =>
                    setEditFormData({
                    ...editFormData,
                    instruction: e.target.value,
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

export default UpdateTest;
