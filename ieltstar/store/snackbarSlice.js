import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    open: false,
    message: '',
    severity: 'success'
}

// Create a slice of the store for users
export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        openSnackbar: (state, action) => {
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },
        closeSnackbar: (state) => {
            state.open = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { openSnackbar, closeSnackbar } = snackbarSlice.actions

export default snackbarSlice.reducer
