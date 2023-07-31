import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}tasks`);
      const data = await res.json();
      setTasks(data)

    }
    loadTasks();
  }, []);

  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io.connect(`${process.env.REACT_APP_BACKEND_URL}`); // Replace with your backend server URL

    // Example: Emit an event from the client to the server
    socket.emit('getUser', (data) => setUsers(data));

    // Clean up the socket connection when the component unmounts
    return () => socket.disconnect()
  }, []);

  return (
    <div>
      <header><h1>Hello, World!</h1></header>
      <div>
        <h2>Tasks from fetch</h2>
        <ul>
          {tasks.map(task => (<li key={task.assignee}>The task to {task.description} is assigned to {task.assignee}</li>))}
        </ul>
      </div>
      <div>
        <h2>Users from socket</h2>
        <ul>
          {users.map(user => (<li key={user}>{user}</li>))}
        </ul>
      </div>
    </div>
  );
}

export default App;
