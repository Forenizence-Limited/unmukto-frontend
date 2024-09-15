import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { postApi } from "./apiSlice/postApi";
import { categoryApi } from "./apiSlice/categoryApi";
import { authApi, authReducer } from "./apiSlice/authApi";

const rootReducer = combineReducers({
  auth: authReducer, 
  [authApi.reducerPath]: authApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([
        authApi.middleware,
        postApi.middleware,
        categoryApi.middleware,
      ]),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
