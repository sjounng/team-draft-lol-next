// WebSocket Server for Real-time Ban/Pick Communication
import { WebSocketServer } from 'ws';
import { createServer } from 'http';

const PORT = process.env.WS_PORT || 8080;

// Create HTTP server for WebSocket
const server = createServer();
const wss = new WebSocketServer({ server });

// Store active sessions and their clients
const sessions = new Map(); // Map<matchId, Set<WebSocket>>

wss.on('connection', (ws, req) => {
  console.log('New WebSocket connection');

  let currentMatchId = null;

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());

      switch (data.type) {
        case 'join':
          // Join a ban/pick session
          currentMatchId = data.matchId;

          if (!sessions.has(currentMatchId)) {
            sessions.set(currentMatchId, new Set());
          }

          sessions.get(currentMatchId).add(ws);
          console.log(`Client joined match ${currentMatchId}. Total clients: ${sessions.get(currentMatchId).size}`);

          // Send confirmation
          ws.send(JSON.stringify({ type: 'joined', matchId: currentMatchId }));
          break;

        case 'action':
          // Broadcast action to all clients in the same match
          // matchId comes from the message data (from API server)
          const targetMatchId = data.matchId;

          if (targetMatchId && sessions.has(targetMatchId)) {
            const clients = sessions.get(targetMatchId);
            const payload = JSON.stringify({
              type: 'update',
              session: data.session
            });

            clients.forEach((client) => {
              if (client.readyState === 1) { // WebSocket.OPEN
                client.send(payload);
              }
            });

            console.log(`Broadcasted update to ${clients.size} clients in match ${targetMatchId}`);
          } else {
            console.log(`No clients connected to match ${targetMatchId}`);
          }
          break;

        case 'leave':
          // Leave the session
          if (currentMatchId && sessions.has(currentMatchId)) {
            sessions.get(currentMatchId).delete(ws);
            console.log(`Client left match ${currentMatchId}`);

            // Clean up empty sessions
            if (sessions.get(currentMatchId).size === 0) {
              sessions.delete(currentMatchId);
              console.log(`Removed empty session ${currentMatchId}`);
            }
          }
          currentMatchId = null;
          break;

        default:
          console.log('Unknown message type:', data.type);
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

  ws.on('close', () => {
    // Clean up on disconnect
    if (currentMatchId && sessions.has(currentMatchId)) {
      sessions.get(currentMatchId).delete(ws);
      console.log(`Client disconnected from match ${currentMatchId}`);

      if (sessions.get(currentMatchId).size === 0) {
        sessions.delete(currentMatchId);
        console.log(`Removed empty session ${currentMatchId}`);
      }
    }
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  // Send ping every 30 seconds to keep connection alive
  const pingInterval = setInterval(() => {
    if (ws.readyState === 1) {
      ws.ping();
    } else {
      clearInterval(pingInterval);
    }
  }, 30000);
});

server.listen(PORT, () => {
  console.log(`🚀 WebSocket server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
