import { useAppDispatch, useAppSelector } from "./store/store";
import { Todo } from "./store/todos/todosSlice";
import { useEffect } from "react";
import { ADD_TODO, FETCH_TODOS, COMPLETE_TODO } from "./store/todos/types";
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

  const handleCompleteTodo = (id: number) => {
    dispatch({ type: COMPLETE_TODO, payload: { id: id } });
  };
  return (
    <div className="wrapper">
      <div className="items-wrapper">
        {todos
          ?.slice()
          .sort((a, b) => a.id - b.id)
          .map((cur) => (
            <div className="item" key={cur.id}>
              <div className="item-wrapper">
                <p>{cur.text}</p>
                <p>
                  {cur.completed ? (
                    "Completed"
                  ) : (
                    <button onClick={() => handleCompleteTodo(cur.id)}>
                      Complete
                    </button>
                  )}
                </p>
              </div>
            </div>
          ))}
      </div>

      <div className="add-item-wrapper">
        <div>
          <input
            id="new-todo-input"
            type="text"
            placeholder={newTodoText}
            onChange={(e) => (newTodoText = e.target.value)}
          />
          <button onClick={handleAddTodo}>Add Item</button>
        </div>
      </div>
    </div>
  );
}

export default App;
