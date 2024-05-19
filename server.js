// server.js
const express = require('express');
const next = require('next');
const WebSocket = require('ws');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Example custom route
  server.get('/p/:id', (req, res) => {
    const actualPage = '/post';
    const queryParams = { id: req.params.id };
    app.render(req, res, actualPage, queryParams);
  });

  // Custom API route
  server.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, world!' });
  });

  // Default catch-all handler to allow Next.js to handle all other routes
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;

  const httpServer = server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });

  // WebSocket server for sending random numbers
  const wss1 = new WebSocket.Server({ server: httpServer, path: '/ws/random-number' });
  wss1.on('connection', (ws) => {
    console.log('Client connected to /ws/random-number');
    const sendRandomNumber = () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ number: Math.random() }));
        setTimeout(sendRandomNumber, 1000);
      }
    };
    sendRandomNumber();
    ws.on('close', () => {
      console.log('Client disconnected from /ws/random-number');
    });
  });

  // WebSocket server for sending random six-digit passwords
  const wss2 = new WebSocket.Server({ server: httpServer, path: '/ws/random-password' });
  wss2.on('connection', (ws) => {
    console.log('Client connected to /ws/random-password');
    const sendRandomPassword = () => {
      if (ws.readyState === WebSocket.OPEN) {
        const randomPassword = Math.floor(100000 + Math.random() * 900000).toString();
        ws.send(JSON.stringify({ password: randomPassword }));
        setTimeout(sendRandomPassword, 1000);
      }
    };
    sendRandomPassword();
    ws.on('close', () => {
      console.log('Client disconnected from /ws/random-password');
    });
  });
});
