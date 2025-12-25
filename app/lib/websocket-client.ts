// WebSocket client for server-side broadcasting
import WebSocket from 'ws';

const WS_URL = process.env.WS_URL || 'ws://localhost:8080';

/**
 * Broadcast session update to all connected clients in a match
 */
export async function broadcastSessionUpdate(matchId: string, session: any): Promise<void> {
  try {
    const ws = new WebSocket(WS_URL);

    // Wait for connection to open
    await new Promise<void>((resolve, reject) => {
      ws.on('open', () => resolve());
      ws.on('error', (error) => reject(error));

      // Timeout after 3 seconds
      setTimeout(() => reject(new Error('WebSocket connection timeout')), 3000);
    });

    // Send the update
    ws.send(JSON.stringify({
      type: 'action',
      matchId,
      session
    }));

    // Close after sending
    ws.close();

    console.log(`[WebSocket Client] Broadcasted update for match ${matchId}`);
  } catch (error) {
    console.error('[WebSocket Client] Error broadcasting update:', error);
    // Don't throw - failing to broadcast shouldn't break the API
  }
}
