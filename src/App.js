import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import "./App.css"

function App() {
  const [taskInput, setTaskInput] = useState("")
  const [tasks, setTasks] = useState([])
  console.log(tasks)

  const handleSubmitTask = (e) => {
    e.preventDefault()
    setTasks([
      ...tasks,
      { id: uuidv4(), name: taskInput.trim(), isCompleted: false },
    ])
    setTaskInput("")
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const handleCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.isCompleted))
  }

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) => {
        return task.id === id
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      }),
    )
  }

  return (
    <div className="todo-app">
      <div className="todo-container">
        <header className="todo-header">
          <h1 className="todo-title">My Todos</h1>
          <p className="todo-subtitle">Keep track of what needs to get done.</p>
        </header>

        <form onSubmit={handleSubmitTask}>
          <div className="todo-input-wrapper">
            <input
              className="todo-input"
              type="text"
              placeholder="What needs to be done?"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />

            <button
              className="add-button"
              type="submit"
              disabled={!taskInput.trim()}
            >
              Add task
            </button>
          </div>
        </form>

        <div className="todo-list">
          {tasks.length === 0
            ? "No available tasks"
            : tasks.map((task) => {
                return (
                  <div className="todo-item" key={task.id}>
                    <input
                      type="checkbox"
                      className="todo-checkbox"
                      checked={task.isCompleted}
                      onChange={() => handleToggleTask(task.id)}
                    />

                    <span className="todo-text">{task.name}</span>

                    <button
                      className="delete-button"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      ×
                    </button>
                  </div>
                )
              })}
        </div>

        <div className="todo-footer">
          <span>
            {tasks.filter((task) => task.isCompleted === false).length}{" "}
            {tasks.length === 1 ? "task" : "tasks"} remaining
          </span>

          <button className="clear-button" onClick={handleCompletedTasks}>
            Clear completed
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
