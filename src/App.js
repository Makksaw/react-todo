import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import "./App.css"

function App() {
  const [taskInput, setTaskInput] = useState("")
  const [priority, setPriority] = useState("medium")
  const [tasks, setTasks] = useState([])
  console.log(tasks)

  const handleSubmitTask = (e) => {
    e.preventDefault()
    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        name: taskInput.trim(),
        isCompleted: false,
        priority: priority,
      },
    ])
    setTaskInput("")
    setPriority("medium")
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

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = {
      high: 1,
      medium: 2,
      low: 3,
    }

    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

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

            <select
              className="priority-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

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
            : sortedTasks.map((task) => {
                return (
                  <div
                    className={`todo-item priority-${task.priority} ${task.isCompleted ? "completed" : ""}`}
                    key={task.id}
                  >
                    <input
                      type="checkbox"
                      className="todo-checkbox"
                      checked={task.isCompleted}
                      onChange={() => handleToggleTask(task.id)}
                    />

                    <div className="todo-content">
                      <span className="todo-text">{task.name}</span>

                      <span className={`priority-badge ${task.priority}`}>
                        {task.priority}
                      </span>
                    </div>

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
