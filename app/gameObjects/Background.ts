import {GameObject} from '../lib/engine';

export class Background extends GameObject {
  constructor() {
    super();
    this.position.x = 0;
    this.position.y = 0;

    this.sprite = new Image();
    this.sprite.src = "./assets/images/staff.png"
  }


  update() {

  }

  render(context) {


    context.drawImage(this.sprite, 0, 0, this.hitbox.width, this.hitbox.height,
      this.position.x, this.position.y, this.hitbox.width, this.hitbox.height);
  }

  sprite: any
}
