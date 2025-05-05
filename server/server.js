const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from the React dev server
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Rogue-like Text Worlds Server is running!');
});

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });

  // Placeholder for game logic events
  // socket.on('player_action', (data) => { ... });
});

server.listen(PORT, () => {
  console.log(`Server listening on *:${PORT}`);
});
