import {GameObject} from '../lib/engine';
import midi from '../lib/midi/midi';
export class NoteManager extends GameObject {

  public sprite = new Image();
  constructor(typeOfNote:string) {
    super();
    //this.sprite.src = './assets/notes/'+typeOfNote+'.png';
  }

  update() {
  }

  render(context: CanvasRenderingContext2D) {

  }
}
