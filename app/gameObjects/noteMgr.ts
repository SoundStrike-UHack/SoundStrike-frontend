import {GameObject, Scene} from '../lib/engine';
import {Note} from "./note";

export class NoteMgr extends GameObject {
  constructor(scene, stream, socket) {
    super();



    this.score = 0;
    socket.on("scoreUpdate", (data) => {
      this.score = data.score
    });

    this.scene = scene;
    this.stream = stream;
    this.counter = 0;

    this.nextNote();

    window.addEventListener("timeUp", (e) => {
      var note = this.scene.findObjectOfType("note");
      this.scene.destroy(note[0]);
      this.nextNote();
    });
  }

  update(currentScene:Scene) {
  }

  render(context: CanvasRenderingContext2D) {
  }

  nextNote() {
    var note = new Note(this.stream[this.counter].pitch,
      this.stream[this.counter].duration);
    this.scene.add(note);
    this.counter++;
  }

  stream: any
  counter: number
  score:number
  scene:Scene
}
