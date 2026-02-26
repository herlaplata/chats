import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import io from 'socket.io-client'
import './App.css'


const socket = io("/")

function App() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([])


  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: 'Me'
    }

    setMessages([...messages, newMessage])
    socket.emit('message', message);
  };

  useEffect(() => {
    socket.on('message', reciveMessage);

    return () => {
      socket.off('message', reciveMessage);
    };
  }, []);

  const reciveMessage = (message) =>
    setMessages((state) => [...state, message]);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Mensaje' onChange={(e) => setMessage(e.target.value)}></input>
          <button>Enviar</button>
        </form>
        <ul>
          {messages.map((message, i) => (
            <li key={i}>{message.from}:{message.body}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
