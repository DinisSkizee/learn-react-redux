import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_TODOS,
  FETCH_TODOS_SUCCESS,
  SET_TODOS,
  TODO_FAILURE,
} from "./types";
import { Todo } from "./todosSlice";

const todosFetch = () => {
  return fetch(
    "https://my-json-server.typicode.com/DinisSkizee/learn-react-redux/todos"
  ).then((response) => response.json());
};

function* workGetTodosFetch() {
  try {
    const todos: Todo[] = yield call(todosFetch);
    console.log(todos);
    yield put({ type: FETCH_TODOS_SUCCESS, todos });
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

export function* watchFetchTodos() {
  yield takeLatest(FETCH_TODOS, workGetTodosFetch);
}

function* rootSaga() {
  yield all([watchFetchTodos()]);
}

export default rootSaga;