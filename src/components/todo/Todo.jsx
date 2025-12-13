import React, { useState } from "react";

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState("");
    const [todoFilter, setTodoFilter] = useState("all");

    const addTodo = () => {
        if (todoInput.trim() === "") return;

        let newTodo = {
            id: Date.now(),
            text: todoInput.trim(),
            completed: false,
        }

        setTodos(prev => [...prev, newTodo]);
        setTodoInput("");
    }

    const toggleTodo = (id) => {
        setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    }

    const filteredTodos = todos.filter(todo => {
        if(todoFilter === "active") return !todo.completed;
        if(todoFilter === "completed") return todo.completed;
        return true;
    })

    return (
        <div className="w-full h-full flex flex-col text-white">

            {/* New Task Input */}
            <div className="mb-4">
                <textarea
                    placeholder="Add a new task..."
                    className="w-full p-2 bg-white/5 border border-white/10 rounded-lg outline-none resize-none focus:bg-white/10"
                    rows={2}
                    value={todoInput}
                    onChange={(e) => setTodoInput(e.target.value)}
                />
                <button
                    className="mt-2 bg-white/10 hover:bg-white/20 rounded-lg py-2 px-3 text-sm text-white font-semibold transition-all duration-200 cursor-pointer"
                    onClick={addTodo}
                >
                    Add
                </button>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-3 mb-4">
                <button
                    className={`rounded-lg py-1 px-3 text-white font-semibold transition-all duration-200 cursor-pointer hover:bg-white/10 ${todoFilter === "all" ? "bg-white/20 scale-105 " : "active:scale-95 hover:bg-white/10"}`}
                    onClick={() => setTodoFilter("all")}
                >
                    All
                </button>

                <button 
                    className={`rounded-lg py-1 px-3 text-white font-semibold transition-all duration-200 cursor-pointer hover:bg-white/10 ${todoFilter === "active" ? "bg-white/20 scale-105 " : "active:scale-95 hover:bg-white/10"}`}
                    onClick={() => setTodoFilter("active")}
                >
                    Active
                </button>

                <button 
                    className={`rounded-lg py-1 px-3 text-white font-semibold transition-all duration-200 cursor-pointer hover:bg-white/10 ${todoFilter === "completed" ? "bg-white/20 scale-105 " : "active:scale-95 hover:bg-white/10"}`}
                    onClick={() => setTodoFilter("completed")}
                >
                    Completed
                </button>
            </div>

            {/* Todo Items Container */}
            <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
                {filteredTodos.length === 0 ? (
                    <p className="text-white/40 italic">No todos yet.</p>
                ) : filteredTodos.map(todo => (
                    <div
                        key={todo.id}
                        className="bg-white/5 border border-white/10 rounded-lg p-3"
                        onClick={() => toggleTodo(todo.id)}
                    >
                        <p className={`whitespace-pre-wrap text-sm font-semibold ${todo.completed === true ? "line-through opacity-50" : ""}`}>
                            {todo.text}
                        </p>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Todo;
