import {
  addTask,
  removeTask,
  updateTask,
  setInitialState,
  setLoadingState,
  setErrorState,
} from "../reducer";

const localStorageApi = (store) => (next) => (action) => {
  if (action.type == "getLocalStorage") {
    if (localStorage) {
      store.dispatch(setLoadingState({ loading: true }));
      const taskRetrieved = localStorage.getItem("TaskLists");
      const tasks = JSON.parse(taskRetrieved || "[]");
      store.dispatch(setInitialState({ tasks }));
      store.dispatch(setLoadingState({ loading: false }));
    } else {
      store.dispatch(setErrorState({ error: "Local Storage not found" }));
    }
  } else if (action.type == "addLocalStorage") {
    if (localStorage) {
      store.dispatch(setLoadingState({ loading: true }));
      const task = JSON.stringify(action.payload);
      store.dispatch(addTask(action.payload));
      localStorage.setItem(
        "TaskLists",
        JSON.stringify(store.getState().taskReducer.tasks)
      );
      store.dispatch(setLoadingState({ loading: false }));
    } else {
      store.dispatch(setErrorState({ error: "Local Storage not found" }));
    }
  } else if (action.type == "removeLocalStorage") {
    if (localStorage) {
      store.dispatch(setLoadingState({ loading: true }));
      store.dispatch(removeTask(action.payload));
      localStorage.setItem(
        "TaskLists",
        JSON.stringify(store.getState().taskReducer.tasks)
      );
      store.dispatch(setLoadingState({ loading: false }));
    } else {
      store.dispatch(setErrorState({ error: "Local Storage not found" }));
    }
  } else if (action.type == "updateLocalStorage") {
    if (localStorage) {
      store.dispatch(setLoadingState({ loading: true }));
      store.dispatch(updateTask(action.payload));
      localStorage.setItem(
        "TaskLists",
        JSON.stringify(store.getState().taskReducer.tasks)
      );
      store.dispatch(setLoadingState({ loading: false }));
    } else {
      store.dispatch(setErrorState({ error: "Local Storage not found" }));
    }
  } else {
    next(action);
  }
};

export default localStorageApi;
