import { WebSocketServer, WebSocket } from "ws";

const PORT = 3001; // Change this if needed
const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (ws: WebSocket) => {
  console.log("Client connected");

  ws.on("message", (data: string) => {
    console.log("Received ECG Data:", data);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  ws.on("close", () => console.log("Client disconnected"));
});

console.log(`WebSocket server is running on ws://localhost:${PORT}`);
