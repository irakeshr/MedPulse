import { io } from "socket.io-client";
import SERVER_URL from "./server/ServerURL";

// SERVER_URL is "http://localhost:5000/api", we need "http://localhost:5000"
const SOCKET_URL = SERVER_URL.replace('/api', '');

export const socket = io(SOCKET_URL, {
    autoConnect: false,
});
