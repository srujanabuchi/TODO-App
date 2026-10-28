import { useState } from 'react'
import './App.css'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  function addTask(e) {
    e.preventDefault()

    if (task.trim() === '') return

    setTasks([
      ...tasks,
      { id: Date.now(), text: task, completed: false }
    ])

    setTask('')
  }

  function toggleTask(id) {
    setTasks(tasks.map(item =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    ))
  }

  function deleteTask(id) {
    setTasks(tasks.filter(item => item.id !== id))
  }

  return (
    <div className="app">
      <div className="todo-card">
        <h1>My TODO App</h1>
        <p className="subtitle">Organize your day, one task at a time.</p>

        <form onSubmit={addTask} className="task-form">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="submit">Add +</button>
        </form>

        <h2>My Tasks ({tasks.length})</h2>

        {tasks.length === 0 ? (
          <p className="empty">No tasks yet. Add your first task!</p>
        ) : (
          <ul className="task-list">
            {tasks.map(item => (
              <li key={item.id} className="task-item">
                <label className={item.completed ? 'completed' : ''}>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleTask(item.id)}
                  />
                  {item.text}
                </label>

                <button
                  className="delete"
                  onClick={() => deleteTask(item.id)}
                  type="button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App