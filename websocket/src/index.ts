import express from 'express';
import { WebSocketServer, WebSocket } from 'ws';

const app = express();
const httpServer = app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

const wss = new WebSocketServer({ server: httpServer });

wss.on('connection', function connection(ws) {
  console.log('Client connected!');

  ws.on('message', function message(data, isBinary) {
    console.log('Received:', data.toString());
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.send('Hello! Message from server!!');
});
