import { configureStore } from "@reduxjs/toolkit";
import AdminTokenSlice from "./Admin/AdminTokenSlice";
const store = configureStore({
    reducer: {
     isToken:AdminTokenSlice
    },
  });
  
  export default store;
  