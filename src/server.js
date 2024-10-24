const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let rooms = {};

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    const { type, roomId, player } = data;

    switch (type) {
      case 'join':
        if (!rooms[roomId]) {
          rooms[roomId] = [];
        }
        rooms[roomId].push(player);
        broadcast(roomId, {
          type: 'update',
          players: rooms[roomId],
        });
        break;
      case 'leave':
        if (rooms[roomId]) {
          rooms[roomId] = rooms[roomId].filter(p => p.nickname !== player.nickname);
          broadcast(roomId, {
            type: 'update',
            players: rooms[roomId],
          });
        }
        break;
      case 'requestPlayers':
        ws.send(JSON.stringify({
          type: 'update',
          roomId,
          players: rooms[roomId] || [],
        }));
        break;
      case 'start':
        broadcast(roomId, {
          type: 'start',
        });
        break;
    }
  });

  ws.on('close', () => {
    // Handle disconnection if necessary
  });
});

function broadcast(roomId, message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ roomId, ...message }));
    }
  });
}

console.log('WebSocket server is running on ws://localhost:8080');