import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "./TaskSlice";

const AppStore = configureStore({
  reducer: {
    tasks: TaskReducer
  }
});

export default AppStore;