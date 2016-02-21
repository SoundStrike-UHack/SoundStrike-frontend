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
        this.keyBuffer.push({ pitch: key, duration: e.detail[key].duration, start: e.detail[key].startTime })
      }
      console.log(this.keyBuffer);
    });
  }

  update() {
    midi.update();
  }

  render(context: CanvasRenderingContext2D) {
    this.keyBuffer.map((c) => {
      var letter = 0;
      switch (c.pitch % 12) {
        case 2:
        case 3:
          letter = 1;
          break;
        case 4:
          letter = 2;
          break;
        case 5:
        case 6:
          letter = 3;
          break;
        case 7:
        case 8:
          letter = 4;
          break;
        case 9:
        case 10:
          letter = 5;
          break;
        case 11:
          letter = 6;
          break;
      }
      letter += 7 * Math.floor(c.pitch / 12);
      var yy = -8 + (32 * (43 - letter));
      context.drawImage(this.sprite, 64, yy - 144);
    });
  }
}
