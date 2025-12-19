import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { CreateTodo } from "./Components/CreateTodo";
import { Todos } from "./Components/Todo";

function App() {
  const [todos, setTodos] = useState([]);

  fetch("http://localhost:3000/todo").then(async (response) => {
    const res = await response.json();
    setTodos(res.todos)
  });

  return (
    <>
      <div>
        Hi there
        <CreateTodo />
        <Todos
          todos={todos}
        />
      </div>
    </>
  );
}

export default App;
