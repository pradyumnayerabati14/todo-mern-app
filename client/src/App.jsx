import React, {useState,useEffect} from 'react';
import './App.css';


export default function App(){
  const [task,setTask] = useState("");
  const [tasks,setTasks] = useState([]);

  useEffect(() => {loadTasks();}, []);

  // on submit hit POST API
  async function submitHandler(event){
    event.preventDefault()
    const response  = await fetch("/api/tasks",{
      method:"POST",
      body: JSON.stringify({"title":task}),
      headers:{
        "accept": "application/json",
        "Content-type":"application/json"
      }
    });
    await loadTasks();
  }

  // GET Tasks API
  async function loadTasks(){
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  }

  //PATCH Tasks API with id
  async function patchTasks(taskID,currentStatus){
    const res = await fetch(`/api/tasks/${taskID}`,{
      method: "PATCH",
      body : JSON.stringify({"completed":!currentStatus}),
      headers:{
        "accept": "application/json",
        "Content-type":"application/json"
      }
    });
    setTask("");
    await loadTasks();
  }

  //DELETE a task API
  async function deleteTasks(taskID){
    const res = await fetch(`/api/tasks/${taskID}`,{
      method: "DELETE"
    });
    await loadTasks();
  }

  return(
    <main>
      <form onSubmit={submitHandler}>
          <h1> To-Do App</h1>
          <br></br>
          <br></br>
          <h2>Enter a task</h2>
          <input className="inputbox"
            type="text"
            placeholder="Type Your Task"
            value={task}
            onChange={(event) => setTask(event.target.value)}
          />
          <button type="submit">Submit</button>
      </form>

      <ul>
        {tasks.map((singleTask, index) => (
          <li key={singleTask._id} className="SingleTask">
            {singleTask.title}- {String(singleTask.completed)}
            <div style={{ display: "flex", gap: "8px" }}>
              <button className="updateBtn" onClick={() => patchTasks(singleTask._id, singleTask.completed)}>Toggle</button>
              <button className="deleteBtn" onClick={() => deleteTasks(singleTask._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

    </main>
  )
};
