import { useState } from "react";
import "./App.css";
import { TaskList } from "./components/tasktracker/TaskList";
import { AddTaskForm } from "./components/tasktracker/AddTaskForm";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";

function App() {
  const [user, setUser] = useState("Saumya");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="App">
      {/* <TaskList user={user} /> */}

      <div className="Title">
        <h1>Task Tracker</h1>
      </div>
      {isLoggedIn ? (
        <TaskList user={user} />
      ) : (
        <div className="login-wrapper">
          {currentForm === "login" ? (
            <Login onFormSwitch={toggleForm} setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Register onFormSwitch={toggleForm} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
