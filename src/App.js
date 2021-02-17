import React from 'react';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

function App() {

  const [showAddTask, setShowAddTask]= useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(()=>{
   const getTasks = async()=>{
     const tasksFromSever = await fetchTasks()
     setTasks(tasksFromSever)
   }
   getTasks()
  }, [])

  //Fetch data from 

  const fetchTasks = async() => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  //Add Task
  const addTask =(task) =>{
    const id = Math.floor(Math.random()* 10000) + 1
    const newTask   = {id, ...task}
    setTasks([...tasks, newTask])
  }

  //Delete Task
  const deleteTask = (id) =>{
    setTasks(tasks.filter((task)=> task.id !== id))
  
  }

  //Toggle reimder
  const toggleReminder = (id) =>{
    setTasks(tasks.map((task) => 
      task.id === id? {...task, reminder: !task.reminder}: task
      )
    )
  }


  return (
    <div className="container">
      <h1>Hello from React</h1>
        <Header onAdd={()=>setShowAddTask(!showAddTask)} 
        showAdd={showAddTask}/>
        {showAddTask && <AddTask onAdd={addTask}/>}
        {tasks.length > 0? <Tasks tasks={tasks} onDelete={deleteTask} onToggle = {toggleReminder}/> 
        : ('No task to Show')}
    </div>
  );
}

export default App;
