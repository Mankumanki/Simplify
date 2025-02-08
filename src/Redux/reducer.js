import { createSlice } from "@reduxjs/toolkit";

/*Completed, Pending*/
const initialState = {
  tasks: [],
  error: "",
  loading: false,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.tasks = action.payload.tasks;
    },
    setLoadingState: (state, action) => {
      state.loading = action.payload.loading;
    },
    setErrorState: (state, action) => {
      state.error = action.payload.error;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action) => {
      const idx = state.tasks.findIndex((value) => {
        return value.id === action.payload.id;
      });
      state.tasks.splice(idx, 1);
    },
    updateTask: (state, action) => {
      const idx = state.tasks.findIndex((value) => {
        return value.id === action.payload.id;
      });
      state.tasks[idx] = action.payload;
    },
  },
});

export const {
  setInitialState,
  setLoadingState,
  setErrorState,
  addTask,
  removeTask,
  updateTask,
} = taskSlice.actions;
export default taskSlice.reducer;
