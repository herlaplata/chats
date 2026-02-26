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
      <div className='h-screen bg-zinc-800 text-white flex items-center justify-center'>
        <form onSubmit={handleSubmit} className='bg-zinc-900 p-10'>
          <h1 className='text-2xl font-bold my-2'>Chat utn</h1>
          <input type="text" placeholder='Mensaje' className='border-2 border-zinc-500 p-2 w-full text-white'
            onChange={(e) => setMessage(e.target.value)}></input>
          <button>Enviar</button>
          <ul>
            {messages.map((message, i) => (
              <li key={i}
                className={`{my-2 p-2 table text-sm rounded-md ${message.from == 'Me' ? `bg-sky-700` : `bg-black ml-auto`}`}>{message.from}:{message.body}</li>
            ))}
          </ul>
        </form>
      </div>
    </>
  )
}

export default App
