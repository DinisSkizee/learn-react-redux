import { useAppDispatch, useAppSelector } from "./store/store";
import { Todo } from "./store/todos/todosSlice";
import { useEffect } from "react";
import { FETCH_TODOS } from "./store/todos/types";
import "./App.sass";

function App() {
  const todos: Todo[] = useAppSelector((state) => state.todos.todos);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: FETCH_TODOS });
  }, [dispatch]);

  return (
    <div className="wrapper">
      <div className="items-wrapper">
        {todos?.map((cur) => (
          <div key={cur.id}>
            {cur.text}
            <br />
            <span>{cur.completed ? "Completed" : "Not Completed"}</span>
          </div>
        ))}
      </div>

      <div className="add-item-wrapper">
        <div>
          <input type="text" />
          <button>Add Item</button>
        </div>
      </div>
    </div>
  );
}

export default App;
