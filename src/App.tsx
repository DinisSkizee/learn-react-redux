import { useAppDispatch, useAppSelector } from "./store/store";
import { Todo } from "./store/todos/todosSlice";
import { useEffect } from "react";
import { FETCH_TODOS } from "./store/todos/types";

function App() {
  const todos: Todo[] = useAppSelector((state) => state.todos.todos);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: FETCH_TODOS });
  }, [dispatch]);

  return (
    <>
      <div>
        {todos?.map((cur) => (
          <div key={cur.id}>{cur.text}</div>
        ))}
      </div>
    </>
  );
}

export default App;
