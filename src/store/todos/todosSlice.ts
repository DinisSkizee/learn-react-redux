import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchTodosAsync } from "./todosThunks";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      const text = action.payload.text;
      const lastId = state.todos.reduce(
        (maxId, todo) => Math.max(maxId, todo.id),
        0
      );
      const newTodo = {
        id: lastId + 1,
        text,
        completed: false,
      };

      state.todos.push(newTodo);
    },
    removeTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodosAsync.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { addTodo, removeTodo, setTodos } = todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.todos;

export default todosSlice.reducer;
