import {GameObject} from '../lib/engine';

export class Note extends GameObject {
  public type = 'note';
  public sprite = new Image();

  duration:number
  timeAlive:number
  constructor(pitch, duration) {
    super();
    this.duration = duration;
    var bpm = parseInt(document.getElementById('bpm').innerText);
    switch(duration) {
      case duration === 60 / bpm:
          this.sprite.src = "./assets/images/whole.png";
          break;
      case duration === 60 / bpm / 2:
          this.sprite.src = "./assets/images/half.png";
          break;
      case duration === 60 / bpm / 4:
          this.sprite.src = "./assets/images/quarter.png"
          break;
      case duration === 60 / bpm / 8:
          this.sprite.src = "./assets/images/eihth.png"
          break;
    }
    this.timeAlive = 0;
  }

  update(scene, something, deltaTime) {
    this.timeAlive += deltaTime
    if(this.timeAlive >= this.duration) {
      window.dispatchEvent(new Event("timeUp"));
    }
  }

  render(context: CanvasRenderingContext2D) {
    context.drawImage(this.sprite, 0, 0, this.hitbox.width, this.hitbox.height,
      this.position.x, this.position.y, this.hitbox.width, this.hitbox.height);
  }
}
