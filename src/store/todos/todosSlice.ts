import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { addTodoAsync, fetchTodosAsync } from "./todosThunks";
import { createNewTodo } from "./todosService";

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addTodo: (state, action: any) => {
      const text = action.payload.text;
      const newTodo = createNewTodo(text, state.todos);

      state.todos.push(newTodo);
    },
    removeTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = [...action.payload];
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    completeTodo: (state, action: any) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      console.log(index);
      state.todos[index].completed = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodosAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addTodoAsync.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { addTodo, removeTodo, setTodos, completeTodo } =
  todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.todos;

export default todosSlice.reducer;
