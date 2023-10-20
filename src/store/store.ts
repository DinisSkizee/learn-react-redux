import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import rootReducer from "./rootReducer";
import rootSaga from "./todos/todosSagas";
import thunkMiddleware from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import logger from "redux-logger";

function* rootSagas() {
  yield all([rootSaga()]);
}

// Create a saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(sagaMiddleware)
      .prepend(thunkMiddleware)
      .concat(logger),
});

// Run the root sagas
sagaMiddleware.run(rootSagas);

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
