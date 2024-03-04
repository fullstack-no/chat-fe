import { io } from "socket.io-client";

export const socket = io(process.env.REACT_APP_SERVER_URL as string, {
  autoConnect: false,
  withCredentials: true,
});

export type SocketResponse =
  | {
      status: true;
      data?: any;
    }
  | {
      status: false;
      message: string;
    };
