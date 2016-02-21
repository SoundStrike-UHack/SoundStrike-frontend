import io from 'socket.io-client';

class SessionManager {
  constructor() {
    this.socket = io();

    this.socket.on("connection", function(socket) {
      document.getElementById("gl-scene").style.display = "block";
      socket.emit('initializeSession',
        { bpm: document.getElementById("bpm").innerText },
        function(data) {
          this.session = data.sessionNumber;
          //document.getElementById("bpm").setAttribute("disabled", "true");
        });

      window.addEventListener("midiReleased", function(e: CustomEvent) {
        socket.emit("midiReleased", e.detail);
        console.log(e.detail);
      });



      socket.on('streamSent', function(data) {
        if (data instanceof Error) {
          alert(data);
          return;
        }

        if (data !== undefined) {
          this.stream = data;
        }
      });
    });
  }

  requestStream() {
    this.socket.emit('requestNotesStream',
      {
        musicStreamDuration: 60
      },
      (data) => {
        if (data instanceof Error) {
          alert(data);
          return;
        }
        if (data !== undefined) {
          this.stream = data;
        }
      });
  }

  public socket: any;
  public stream: any;
  session: string;
}

  export default new SessionManager();
