import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchTodosAsync } from "./todosThunks";

export interface Todo {
  id: string;
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
      const lastId = state.todos[state.todos.length - 1].id;
      action.payload.id = String(Number(lastId) + 1);
      state.todos.push(action.payload);
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
