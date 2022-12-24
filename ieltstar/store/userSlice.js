import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  user: {},
  status: 'idle', // idle, loading, succeeded, failed
  error: null
}

// Create a slice of the store for users
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = {};
    }
  },

})

// Action creators are generated for each case reducer function
export const { logoutUser } = userSlice.actions

export default userSlice.reducer