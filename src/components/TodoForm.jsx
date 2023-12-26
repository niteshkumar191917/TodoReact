import { useState } from "react";
import { useTodo } from "../context/TodoContext";

function TodoForm() {

    const [todo, setTodo] = useState('')
    const { addTodo } = useTodo()

    const add = (e) => {
        e.preventDefault()
        if (!todo) return
        addTodo({
            todo,
            completed: false
        })
        setTodo("")
    }

    return (
        <form className="flex">
            <input
                type="text"
                placeholder="what you do today..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(val) => setTodo(val.target.value)}
            />
            <button onClick={add} type="submit" className="rounded-r-lg px-6 py-4 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

