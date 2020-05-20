import io from "socket.io-client";
import { serverBaseUrl } from "./const";

export const socket = io(serverBaseUrl, { transports: ["websocket"] });
