import React from "react";

//icons
import { BiTrash } from "react-icons/bi";
import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";

export default function TodoLayout({ todo, updateTodo, setTodos }) {
  //Apide update ve delete fonksiyonları da aynı şekilde sunucu tarafında bir değeri değiştirmediği sadece çalıştığını göstermek
  //adına simule edildiği için ben ekranda tamamlanan görüntüsü olsun diye kendi state'imi manipüle ettim.
  //Ve yine sunucu tarafına bir kayıt olmadığı için sayfayı yenilediğimde herşey eski haline dönüyor.

  const changeTodoStatus = () => {
    fetch(`https://dummyjson.com/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed: !todo.completed,
      }),
    })
      .then((res) => res.json())
      .then(console.log);

    updateTodo({ ...todo, completed: !todo.completed });
  };

  const deleteTodo = () => {
    fetch(`https://dummyjson.com/todos/${todo.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(console.log);

    setTodos((prevTodos) =>
      prevTodos.filter((prevTodo) => prevTodo.id !== todo.id)
    );
  };
  return (
    <div className="flex flex-row justify-between items-center px-4 py-2 rounded-md   text-white">
      <div className="flex flex-row items-center  px-4 rounded-md  text-white">
        <h3 className={todo.completed ? "w-72 md:w-96 ml-4 line-through text-green-500 overflow-hidden" : "w-72 md:w-96 ml-4 overflow-x-auto overflow-y-hidden"}>
          {todo.todo}
        </h3>
        <button
          className="bg-transparent border-none text-white mr-2"
          onClick={changeTodoStatus}
        >
          {todo.completed ? (
            <BsCheckCircleFill size={22} />
          ) : (
            <BsCheckCircle size={22} />
          )}
        </button>
        
        <div>
          <button
            className="bg-transparent text-white rounded-md border-none hover:text-red-500"
            onClick={deleteTodo}
          >
            <BiTrash size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
