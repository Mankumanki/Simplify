import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./reducer";
import localStorageApi from "./middlewares/localStorageApi";

const store = configureStore({
  reducer: { taskReducer },
  middleware: (getDefaultMiddlewares) => {
    return [...getDefaultMiddlewares(), localStorageApi];
  },
});

export default store;
