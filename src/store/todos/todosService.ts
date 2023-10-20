export const fetchTodos = async () => {
  const response = await fetch(
    "https://my-json-server.typicode.com/DinisSkizee/learn-react-redux/todos"
  );
  const data = await response.json();
  return data;
};
