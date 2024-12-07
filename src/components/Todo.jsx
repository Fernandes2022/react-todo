import { ArrowBigDown, ArrowBigUp } from 'lucide-react'
import React, { useState } from 'react'
import { useEffect } from 'react';
const Todo = () => {

 const [todos, setTodos] = useState(loadTodoList());
 const [inputTodo, setInputTodo] = useState('')
 const [dates, setDates] = useState('')



 function saveTodoList (todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
 }

 function loadTodoList () {
  const storeTodo = localStorage.getItem('todos');

  return storeTodo ? JSON.parse(storeTodo) : [];
 } 

 useEffect(() => {
   saveTodoList(todos)
 }, [todos])
 
 
 
 function addTodo () {
  if (inputTodo.trim() !== ''){
    const newTodo = {name: inputTodo, date: dates}
    setTodos([...todos, newTodo])
    setInputTodo('')
    setDates('')
  }
 
 }

 function todoDelete (index) {
  const deleteRemain = [...todos];
  deleteRemain.splice(index, 1);
  setTodos(deleteRemain);
}

function moveTodoUp (index) {
  if (index > 0) {
    const setNew = [...todos];
    [setNew[index - 1], setNew[index]] = [setNew[index], setNew[index-1]];

    setTodos(setNew);
  }
}
function moveTodoDown (index) {
  if (index < todos.length - 1) {
    const setNew = [...todos];
    [ setNew[index], setNew[index + 1]] = [setNew[index + 1], setNew[index]];

    setTodos(setNew);
  }
}

  return (
    <section className='bg-gray-400'>
      <div className="min-h-screen  flex justify-center px-4">
       <div className="bg-white  text-black my-4  mx-auto">
           <div className=" mt-8  flex flex-col gap-4 px-2 ">
            
            <div className="text-center">
             <h1 className="text-2xl font-semibold">
              Todo List
             </h1>
            </div>
            
             <div className="grid grid-cols-3 gap-3 ">
             <input type="text" placeholder='Write todo...' className='border-none px-1 rounded-md  bg-gray-200 ' value={inputTodo} onChange={e => setInputTodo(e.target.value)}/>
             <input type="date"  className='border-none px-1 rounded-md  bg-gray-200 ' value={dates} onChange={e => setDates(e.target.value)}/>
             <button className="p-3 border-none rounded-md bg-green-700 text-white w-24"
             onClick={addTodo}
             >Add</button>
             </div>
               
             <ol>
              {todos.map((item, index) => (
                
               <li key={index}  className='py-1 grid grid-flow-col-dense gap-1 items-center'>
               <p>{item.name}</p>
               <p>{item.date}</p>
               <ArrowBigUp onClick={() => (moveTodoUp(index))}/>
               <ArrowBigDown onClick={() => (moveTodoDown(index))}/>
               <button onClick={() => todoDelete(index)} className="p-2 border-none rounded-md bg-red-700 text-white w-24">Delete</button>
               
              </li>
              ))}
             </ol>
           </div>
       </div>
      </div>
    </section>
  )
}

export default Todo