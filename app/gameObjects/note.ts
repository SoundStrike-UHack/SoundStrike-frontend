import {GameObject} from '../lib/engine';

export class Note extends GameObject {
  public type = 'note';
  public sprite = new Image();

<<<<<<< HEAD
  duration:number
  noteType:number
  timeAlive:number
  bpm:number

=======
  duration:number;
  timeAlive:number;
>>>>>>> ea49cfdce6d9cf84de8a39d7288057bb30bdf8a3
  constructor(pitch, duration) {
    super();
    this.duration = duration;
    this.bpm = parseInt(document.getElementById('bpm').innerText);
    switch(duration) {
      case duration === 60 / this.bpm:
          this.sprite.src = "./assets/images/whole.png";
          this.noteType = 1;
          break;
      case duration === 60 / this.bpm / 2:
          this.sprite.src = "./assets/images/half.png";
          this.noteType = 2;
          break;
      case duration === 60 / this.bpm / 4:
          this.sprite.src = "./assets/images/quarter.png"
          this.noteType = 4;
          break;
      case duration === 60 / this.bpm / 8:
          this.sprite.src = "./assets/images/eihth.png"
          this.noteType = 8;
          break;
    }
    this.timeAlive = 0;
  }

  update(scene, something, deltaTime) {
    this.timeAlive += deltaTime
    if(this.timeAlive >= this.duration) {
      window.dispatchEvent(new Event("timeUp"));
    }

    var bps = this.bpm / 60;
    this.position.x += deltaTime * (320 * bps);
  }

  render(context: CanvasRenderingContext2D) {
    context.drawImage(this.sprite, 0, 0, this.hitbox.width, this.hitbox.height,
      this.position.x, this.position.y, this.hitbox.width, this.hitbox.height);
  }
}
