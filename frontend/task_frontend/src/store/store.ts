import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage
import { combineReducers } from "redux"
import formReducer from "./formSlice"
import sessionReducer from "./sessionSlice"
import toogleReducer from "./toogleSlice"
import taskReducer from "./taskSlice";

const taskPersistConfig = {
  key: "tasks",
  storage,
  whitelist: ["tasks"] 
};


// Persist configuration for form data
const formPersistConfig = {
  key: "taskform",
  storage,
  whitelist: ["formData", "isDirty"],
}

// Persist configuration for session data
const sessionPersistConfig = {
  key: "session",
  storage,
  whitelist: ["user", "initialized"],
}

// Persist configuration for toogle data
const tooglePersistConfig = {
  key: "toggle",
  storage,
  whitelist: ["toggles"]
}



//represents the root reducer, which combines all the individual reducers in the application.
  const rootReducer = combineReducers({
    form: persistReducer(formPersistConfig, formReducer),
    session: persistReducer(sessionPersistConfig, sessionReducer),
    toogle: persistReducer(tooglePersistConfig, toogleReducer),
    tasks: persistReducer(taskPersistConfig, taskReducer),
  })


  export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
              // Ignore these action types
              ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
              // Ignore these field paths in all actions
              ignoredActionPaths: ["meta.arg", "payload.timestamp"],
              // Ignore these paths in the state
              ignoredPaths: ["taskform.due_date"],
            },
          }), 


  })

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

