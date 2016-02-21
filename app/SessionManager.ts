

import io from 'socket.io-client';

export
 class SessionManager {
  constructor() {
    this.socket = io();

    this.socket.on("connection", function(socket) {
      document.getElementById("gl-scene").style.display = "block";
      socket.emit('initializeSession',
      {bpm: document.getElementById("bpm").innerText},
      function(data) {
        this.session = data.sessionNumber;
        document.getElementById("bpm").setAttribute("disabled", "true");
      });

      window.addEventListener("midiReleased", function(e: CustomEvent) {
        socket.emit("midiReleased", e.detail);
        console.log(e.detail);
      });

      this.requestStream = () =>
      socket.emit('requestNotesStream',
      {musicStreamDuration:
        document.getElementById("duration").innerText},
        function(data) {
          if (data instanceof Error) {
            alert(data);
            return;
          }
          if(data !== undefined) {
            this.stream = data;
          }
        });

        socket.on('streamSent', function(data) {
          if(data instanceof Error) {
            alert(data);
            return;
          }

          if(data !== undefined) {
            this.stream = data;
          }
        });
      });
    }

    socket: any
    stream: any
    session: string
    public requestStream: any
  }
