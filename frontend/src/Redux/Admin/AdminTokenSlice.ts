import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "accessToken",
  initialState:(''),
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    isLogOut: (state, action) => {
      return ('');
    },
  },
});

export const { addUser, isLogOut } = tokenSlice.actions;
export default tokenSlice.reducer;