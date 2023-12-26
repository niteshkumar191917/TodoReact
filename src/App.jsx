import { useEffect, useState } from "react"
import TodoForm from "./components/TodoForm"
import TodoItem from "./components/TodoItem"
import { TodoProvider } from "./context/TodoContext"
import DarkModeBtn from './components/DarkModeBtn'
import { ThemeProvider } from "./context/Theme"


function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prevState) => [{ id: Date.now(), ...todo }, ...prevState])
  }

  const updateTodo = (id, todo) => {
    setTodos(prevstate => prevstate.map((prevTodo) => (prevTodo.id === id) ? todo : prevTodo))
  }

  const deleteTodo = (id) => {
    setTodos(prevState => prevState.filter((prevTodo) => prevTodo.id != id))
  }

  const toggleComplete = (id) => {
    setTodos(prevstate => prevstate.map((prevTodo) => (prevTodo.id === id) ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todoss = JSON.parse(localStorage.getItem("todos"))
    if (todoss && todoss.length > 0) {
      setTodos(todoss);
      // setTodos(todoss.sort((b, a) => (a.completed === b.completed) ? 0 : a.completed ? -1 : 1))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const [themeMode, setThemeMode] = useState("light")

  const lightTheme = () => {
    setThemeMode("light")
  }

  const darkTheme = () => {
    setThemeMode("dark")
  }
  
  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark")
    document.querySelector('html').classList.add(themeMode)
  }, [themeMode])

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
      <TodoProvider value={{ todos, addTodo, deleteTodo, updateTodo, toggleComplete }}>
        <div className="bg-[#ffffff] dark:bg-gray-400 min-h-screen py-8">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <DarkModeBtn />
          </div>
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-black dark:text-white dark:bg-gray-800">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">
              Todo Using Local Storage and useContext
            </h1>
            <div className="mb-10">
              <TodoForm></TodoForm>
            </div>
            <div className="flex flex-wrap gap-y-3">
              {todos.sort((b, a) => (a.completed === b.completed) ? 0 : a.completed ? -1 : 1).map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </TodoProvider>
    </ThemeProvider>
  )
}

export default App
