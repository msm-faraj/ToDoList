import React, { useEffect, useState } from "react";
import axios from "axios";

interface Todo {
  name: String;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    axios
      .get<Todo[]>("http://localhost:3000/api/todos?page=1&prPage=10")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.name}</li>
        ))}
      </ul>
    </>
  );
};
