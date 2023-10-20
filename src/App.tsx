import { useAppDispatch, useAppSelector } from "./store/store";
import { Todo } from "./store/todos/todosSlice";
import { useEffect } from "react";
import { ADD_TODO, FETCH_TODOS } from "./store/todos/types";
import "./App.sass";

function App() {
  let newTodoText = "";
  const todos: Todo[] = useAppSelector((state) => state.todos.todos);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: FETCH_TODOS });
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodoText) {
      dispatch({ type: ADD_TODO, payload: { text: newTodoText } });

      const element: HTMLElement | null =
        document.getElementById("new-todo-input");
      if (element?.innerText) element.innerText = "";
    }
  };

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
          <input
            id="new-todo-input"
            type="text"
            onChange={(e) => (newTodoText = e.target.value)}
          />
          <button onClick={handleAddTodo}>Add Item</button>
        </div>
      </div>
    </div>
  );
}

export default App;
