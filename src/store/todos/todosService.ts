import { Todo } from "./todosSlice";

export const fetchTodos = async () => {
  const response = await fetch(
    "https://my-json-server.typicode.com/DinisSkizee/learn-react-redux/todos"
  );
  const data = await response.json();
  return data;
};

export const createNewTodo = (text: string, todos: Todo[]) => {
  const lastId = todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0);
  return {
    id: lastId + 1,
    text,
    completed: false,
  };
};
