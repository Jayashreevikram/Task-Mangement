import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Main";
import CreateTask from "./components/Create";
import EditTask from "./components/Edit";

function App() {
  const [tasks, setTasks] = useState([]);

  // Create new task
  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Update task
  const updateTask = (updatedTask) => {
    setTasks(tasks.map((task) => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home tasks={tasks} deleteTask={deleteTask} />}
        />
        <Route
          path="/create"
          element={<CreateTask addTask={addTask} />}
        />
        <Route
          path="/edit/:id"
          element={<EditTask tasks={tasks} updateTask={updateTask} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
