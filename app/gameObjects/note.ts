import {GameObject} from '../lib/engine';

export class Note extends GameObject {
  public type = 'Halthpack';
  public sprite = new Image();
  constructor(, typeOfNote:string) {
    super();

    this.sprite.src = './assets/notes/'+typeOfNote+'.png';
  }

  update() {
  }

  render(context: CanvasRenderingContext2D) {
    context.drawImage(this.sprite, 0, 0, this.hitbox.width, this.hitbox.height,
      this.position.x, this.position.y, this.hitbox.width, this.hitbox.height);
  }
}
