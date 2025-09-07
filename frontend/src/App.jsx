import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CreateTodo } from './components/CreateTodo';
import { Todos } from './components/Todos.jsx';
import NexusPortal from './components/Form.jsx'; // Assuming this is your form component
import NeuroTaskLanding from './components/LandingPage.jsx';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]); // Lowercase 'todos' for clarity

  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then(async (res) => {
        const json = await res.json();
        setTodos(json.Todos); // Assuming the API returns { Todos: [...] }
      })
      .catch((err) => {
        console.error("Failed to fetch todos:", err);
      });
  }, []); // Empty dependency array means it runs once on mount

  return (
    <div>
      <Routes>
        <Route path="/" element={<NeuroTaskLanding/>} />
        <Route path="/form" element={<NexusPortal/>} />
        <Route
          path="/todos"
          element={
            <>
              <CreateTodo setTodos={setTodos} />
              <Todos todos={todos} />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;