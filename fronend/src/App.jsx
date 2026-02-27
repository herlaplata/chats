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
    setMessage("");
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
      <div className='w-full m-10 p-10'>
        <form onSubmit={handleSubmit} className='bg-white shadow-lg rounded-lg max-w-md'>
          <div className='border-b-1 px-2 py-4'>
            <div className='inline-flex items-center'>
              <img src={viteLogo} alt="Logo" className='w-8' />
              <span className='ml-8'>Chat</span>
            </div>
          </div>
          <div className='h-80 flex flex-col mex-w-md px-2 mb-2  mt-2 overflow-y-auto'>
            <ul>
              {messages.map((message, i) => (
                <li key={i}
                  className={`{my-4 p-2 table text-sm rounded-md mb-2 text-white ${message.from == 'Me' ? `bg-blue-500` : `bg-gray-500 ml-auto`}`}>{message.from}: {message.body}</li>
              ))}
            </ul>
          </div>

          <div className='border-t-1 flex items-center py-4 px-2'>
            <input type="text" value={message} placeholder='Mensaje' className='flex-1 rounded-lg px-4 py-2 border-2 mr-2'
              onChange={(e) => setMessage(e.target.value)}></input>
            <button className='relative right-16'>Enviar</button>
          </div>


        </form>
      </div>
    </>
  )
}

export default App
