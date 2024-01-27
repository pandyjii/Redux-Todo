
import './Todo.css'
import { useState } from "react"
import { addTodo,removeTodo,editToDo } from "../features/todo/TodoSlice"
import { useDispatch, useSelector } from "react-redux"

export default function Todo(){
  const[input,setInput]=useState('')
  const dispatch=useDispatch();
  const[isEdit,setIsEdit]=useState(false)
  const[editTodoObj,setEditTodoObj]=useState({})

  const todos=useSelector(state=>state.todos);

  // Add Todo
    function handleClick(){
      if(input.length>0){
        dispatch(addTodo(input))
        setInput('')
        console.log(input)
      }

      else{
        alert("please enter value")
      }
    
      
  }

  // Edit Todo
  function handleEdit(todoObj){
    setEditTodoObj(todoObj);
    setInput(todoObj.text)
    setIsEdit(true)
  }
 
  // Update Todo

  function handleUpdate(){
   dispatch(editToDo({id:editTodoObj.id,text:input}))
   setInput('');
   setIsEdit(false)
  }

  

return(
  <div className='conatiner'>
  {/* Input Todo  */}
   <h2>My Todo List</h2>
   <div className='Addtodo-container'>
      <input type="text"  placeholder='Enter Todos....' value={input} onChange={(e)=>setInput(e.target.value)}/>
      {
        isEdit?
        <button onClick={()=>handleUpdate()}   className='update'>update</button>
        :
        <button onClick={handleClick} className='submit'>Add Todo</button>
      }
      
    </div>


    <div className='todo-container'>
   {/* Render TodoItem */}
       {
         todos && todos.length>0?
           todos.map((todo,index)=>(
             <ul  className="todos">
           
             <li key={todo.id}  className='todo-item'>{todo.text} </li>   

               <div className='todo-button'>
                 <button onClick={()=>dispatch(removeTodo(todo.id))}  className='delete'  ><i class="fa-solid fa-trash"></i></button>
                <button onClick={()=>handleEdit(todo)} className="edit" ><i class="fa-solid fa-pen"></i></button>
               </div>
             </ul>
           ))
           :
           <div className='heading' >
           <h1>Please Add  Item in  todo's  TodoList is Empty</h1>
          
           </div>
         }
       </div>
       </div>
  
)
}













