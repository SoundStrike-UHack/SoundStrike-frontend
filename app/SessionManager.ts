import io from 'socket.io-client';

export class SessionManager {
  constructor() {
    this.socket = io();
    document.getElementById("gl-scene").style.display = "none";



    this.socket.on("connection", function(socket) {
      document.getElementById("gl-scene").style.display = "block";
      socket.emit('initializeSession',
                    {bpm: document.getElementById("bpm").innerText},
                    function(data) {
                      this.session = data.sessionNumber;
                    });

      window.addEventListener("midiReleased", function(e) {
        socket.emit("midiReleased", e.detail);
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
  requestStream: any
}
