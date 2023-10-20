import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTodos } from "./todosService";
import { FETCH_TODOS } from "./types";

export const addTodoAsync = createAsyncThunk(
  "todos/addTodo",
  async (text: string) => {
    const response = await fetch(
      "https://my-json-server.typicode.com/DinisSkizee/learn-react-redux/todos",
      {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  }
);

export const fetchTodosAsync = createAsyncThunk(FETCH_TODOS, async () => {
  return fetchTodos();
});
