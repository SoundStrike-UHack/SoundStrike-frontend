import {GameObject} from '../lib/engine';
import midi from '../lib/midi/midi';
export class NoteManager extends GameObject {

  public sprite = new Image();
  public keyBuffer = [];
  private notes = [];
  constructor(typeOfNote: string) {
    super();
    this.sprite.src = './assets/images/eighth.png';
    window.addEventListener("midiReleased", (e: CustomEvent) => {
      for (var key in e.detail) {
        this.keyBuffer.push({pitch: key, duration: e.detail[key].duration, start: e.detail[key].startTime})
      }
        console.log(this.keyBuffer);
    });
  }

  update() {
    midi.update();
  }

  render(context: CanvasRenderingContext2D) {
    this.keyBuffer.map((c) => {
      console.log(c.pitch % 12);
      var yy = 16 + (64 * (74 - c.pitch));
      context.drawImage(this.sprite,64, yy - 144);
    });
  }
}
