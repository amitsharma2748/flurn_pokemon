import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state

// Define the initial state using that type
const initialState = {
  tasks: JSON.parse(sessionStorage.getItem("fav"))
    ? JSON.parse(sessionStorage.getItem("fav"))
    : [],
};

export const taskSlice = createSlice({
  name: "tasks",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addContact: (state, action) => {
      // console.log(action.payload);
      state.tasks?.push({ ...action?.payload });
      sessionStorage.setItem("fav", JSON.stringify(state?.tasks));
    },
    deleteContact: (state, action) => {
      // console.log(action.payload);
      state.tasks = state.tasks.filter(
        (item, index) => index !== action.payload
      );
      sessionStorage.setItem("fav", JSON.stringify(state.tasks));
    },
  },
});

export const { addContact, deleteContact, updateContact, deleteAllCompleted } =
  taskSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTasks = (state) => state.tasks;

export default taskSlice.reducer;
