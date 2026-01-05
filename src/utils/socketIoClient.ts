import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const socketIoClient = (): Socket | null => {
  if (socket) return socket;

  const token = import.meta.env.VITE_TOKENSOCKETIO;
  if (!token) return null;

  socket = io("http://localhost:3001", {
    transports: ["websocket", "polling"],
    auth: { token },
    reconnection: true,
    reconnectionAttempts: 5,
  });

  return socket;
};