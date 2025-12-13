import React, { useRef, useState } from 'react'

// const Notes = () => {
//     const [todos, setTodos] = useState([]);
//     const [todo, setTodo] = useState("");
//     const inputRef = useRef(null);

//     const addTodo = () => {
//         setTodos(prev => [...prev, todo]);
//         setTodo("");
//     }

//     return (
//         <div>
//             <div className='flex items-center justify-between gap-3'>
//                 <input
//                     type="text"
//                     placeholder='Add a new task... '
//                     value={todo}
//                     onChange={(e) => setTodo(e.target.value)}
//                     ref={inputRef}
//                     className='flex-1 bg-white/20 p-2 text-sm rounded-md text-white font-semibold border-1 border-white/50 outline-none focus:bg-white/30'
//                 />
//                 <button
//                     className='rounded-lg py-2 px-3 text-sm text-white font-semibold transition-all duration-200 cursor-pointer bg-white/20 hover:bg-white/10'
//                     onClick={addTodo}
//                 >
//                     Add
//                 </button>
//             </div>

//             <div className='mt-5'>
//                 <ul className='list-disc pl-5'>
//                     {todos.map((todoTask, index) => (
//                         <li 
//                             key={index} 
//                             className='border-b border-dashed border-white/70 text-sm pb-1 pt-2'
                            
//                         >{
//                             todoTask}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     )
// }

const Notes = () => {
    return (
        <div>Notes</div>
    )
}

export default Notes