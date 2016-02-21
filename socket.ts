import io from "socket.io-client";

export class Socket {
  constructor() {
    this.socket = io();
    this.socket.on('connection', function() {

    });
  }

  socket: any
}
