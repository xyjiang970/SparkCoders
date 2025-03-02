import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import { Routes, Route, Link, useParams, Navigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

// whenever you render the <App /> component
// you'd want to connect to the socket.io server
// sends a "connection" request to your socket io server
// your backend needs to LISTEN to the connection request!
const socket = io("http://localhost:3000/");

function App() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("allMessages", (data) => {
      setMessages(data);
    });
  }, []);
  
  const sendMessage = (event) => {
    event.preventDefault();
    
    // emit an event to the socket server
    // takes in 1. event name and 2. data that you want to pass through
    socket.emit(
      "sendMessage", message
    );
  };

  return (
    <>
      <form onSubmit={sendMessage}>
        <input 
          value={message} 
          onChange={(event) => setMessage(event.target.value)} 
        />
        <button>Send Message</button>
      </form>

      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </>
  );
};

export default App;
