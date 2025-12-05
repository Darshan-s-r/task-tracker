import { createSlice } from "@reduxjs/toolkit";
import type { TaskType } from "../types/TaskType";
const TaskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks : [] as TaskType[]
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask : (state, action) => {
      const updatedTask = action.payload;
      const index = state.tasks.findIndex((task: { _id: string; }) => task._id === updatedTask._id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
    deleteTask : (state, action) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter((task: { _id: string; }) => task._id !== taskId);
    }
  }
});

export default TaskSlice.reducer;
export const { setTasks, addTask, updateTask, deleteTask } = TaskSlice.actions;