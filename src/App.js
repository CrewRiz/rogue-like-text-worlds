import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Connect to the Socket.IO server
const socket = io('http://localhost:3001');

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    // Listener for successful connection
    socket.on('connect', () => {
      console.log('Connected to server:', socket.id);
      setIsConnected(true);
    });

    // Listener for disconnection
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    // Clean up the connection when the component unmounts
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      // Consider if socket.disconnect() is needed based on app logic
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Rogue-like Text Worlds</h1>
        <p>Server Connection Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
