// socket.js
import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io("ws://localhost:3002");
  }
  return socket;
};
