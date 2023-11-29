// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

import Form from "./components/Form";
import { TodoList } from "./components/TodoList";

function App() {
  return (
    <>
      <div>Todo list</div>
      <hr />
      <div>
        <Form></Form>
      </div>
      <hr />
      <div>
        <TodoList></TodoList>
      </div>
    </>
  );
}

export default App;
