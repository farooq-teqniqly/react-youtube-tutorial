import { useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import DefaultTasks from "./data/DefaultTasks";
import AddTask from "./components/AddTask";

function App() {
  const [tasks, setTasks] = useState(DefaultTasks);
  const [showAddTask, setShowAddTask] = useState(false);

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleReminder = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, reminder: !t.reminder } : t))
    );
  };

  const addTask = (task) => {
    const taskId = Math.max(...tasks.map((t) => t.id)) + 1;
    const newTask = { id: taskId, ...task };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No tasks to show. Create some!"
      )}
    </div>
  );
}

export default App;
