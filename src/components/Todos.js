import { useEffect, useState } from "react";
import TodoLayout from "./layouts/TodoLayout";
import AddTodoDialog from "./UI/AddTodoDialog";

export default function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch(
        "https://dummyjson.com/todos?limit=3&skip=10"
      );
      const data = await response.json();
      setTodos(data.todos);
    }
    fetchTodos();
  }, []);

  const updateTodo = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  return (
    <div className="flex flex-col items-center mt-24 bg-[#432667] rounded-md px-4 py-8">
      <AddTodoDialog setTodos={setTodos} />
      <div className="flex flex-col gap-4 items-center w-full mt-8">
        {todos &&
          todos.map((todo) => (
            <div key={todo.id} className="todo-container flex flex-col items-center w-full rounded-md">
              <TodoLayout
                key={todo.id}
                todo={todo}
                updateTodo={updateTodo}
                setTodos={setTodos}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
