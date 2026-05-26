import React, {useState,useEffect} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Todo from './pages/Todo.jsx';
import { createTask, getTasks, loginUser, removeTask, signupUser, updateTask } from './api.js';
import './App.css';


export default function App(){
  const [task,setTask] = useState("");
  const [tasks,setTasks] = useState([]);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [name, setName] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  useEffect(() => {loadTasks();}, [token]);

  // on submit hit POST API
  async function submitHandler(event){
    event.preventDefault();
    await createTask(task, token);
    await loadTasks();
    setTask("");
  }

  // GET Tasks API
  async function loadTasks(){
    if(!token){
      return;
    }
    const { response, data } = await getTasks(token);
    if (!response.ok) {
      localStorage.removeItem("token");
      setToken("");
      setTasks([]);
      return;
    }

    setTasks(data);
  }

  //PATCH Tasks API with id
  async function patchTasks(taskID,currentStatus){
    await updateTask(taskID, !currentStatus, token);
    setTask("");
    await loadTasks();
  }

  //DELETE a task API
  async function deleteTasks(taskID){
    await removeTask(taskID, token);
    await loadTasks();
  }


  // Login Handler
  async function loginHandler(event){
    event.preventDefault();
    try{
      const { response, data } = await loginUser(email, password);
      if(response.ok){
        localStorage.setItem('token',data.token);
        setToken(data.token);
        }
      }
    catch(error){
      console.log("Login failed",error);
    }
  }


  //Logout Handler
  async function logoutHandler(event){
    try{
      localStorage.removeItem("token");
      setToken("");
      setTasks([]);
    }
    catch(error){
      console.log("Unable to logout",error)
    }
  }

  async function signupHandler(event){
    event.preventDefault();
    try{
      const res = await signupUser(name, email, password);

      if (res.ok) {
        setSignupSuccess(true);
      }
      setName("");
      setEmail("");
      setPassword("");
    }
    catch(error){

    }
  }

  return(
    <BrowserRouter>
    <main>
      <Routes>
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/" />
            ) : (
              <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                loginHandler={loginHandler}
              />
            )
          }
        />

        <Route
          path="/signup"
          element={
            signupSuccess ? (
              <Navigate to="/login" />
            ) : (
              <Signup
                email={email}
                setEmail={setEmail}
                name={name}
                setName={setName}
                password={password}
                setPassword={setPassword}
                signupHandler={signupHandler}
              />
            )
          }
        />

        <Route
          path="/"
          element={
            token ? (
              <Todo
                task={task}
                setTask={setTask}
                tasks={tasks}
                submitHandler={submitHandler}
                patchTasks={patchTasks}
                deleteTasks={deleteTasks}
                logoutHandler={logoutHandler}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </main>
    </BrowserRouter>
  )
};
