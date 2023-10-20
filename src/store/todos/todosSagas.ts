import { all, call, put, select, takeLatest } from "redux-saga/effects";
import {
  ADD_TODO,
  FETCH_TODOS,
  FETCH_TODOS_SUCCESS,
  SET_TODOS,
  TODO_FAILURE,
} from "./types";
import { Todo } from "./todosSlice";
import { createNewTodo, fetchTodos } from "./todosService";
import { addTodoAsync } from "./todosThunks";
import { RootState } from "../store";

function* workGetTodosFetch() {
  try {
    const todos: Todo[] = yield call(fetchTodos);
    console.log(todos);
    yield put({ type: FETCH_TODOS_SUCCESS });
    yield put({ type: SET_TODOS, payload: todos });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errorMessage = error.message;
    yield put({
      type: TODO_FAILURE,
      payload: errorMessage,
    });
  }
}
function* watchFetchTodos() {
  yield takeLatest(FETCH_TODOS, workGetTodosFetch);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* workAddTodo(action: any) {
  const text = action.payload.text;
  const state: RootState = yield select();
  const newTodo = createNewTodo(text, state.todos.todos);

  yield call(addTodoAsync, { ...newTodo });
}

function* watchAddTodo() {
  yield takeLatest(ADD_TODO, workAddTodo);
}

function* rootSaga() {
  yield all([watchFetchTodos(), watchAddTodo()]);
}

export default rootSaga;
