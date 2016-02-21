import {GameObject} from '../lib/engine';

export class Background extends GameObject {
  constructor() {
    super();
    console.log("what");
    this.position.x = 0;
    this.position.y = 0;

    this.sprite = new Image();
    this.sprite.src = "./assets/images/staff.png";
  }
  update() {

  }
  render(context: CanvasRenderingContext2D) {
    context.drawImage(this.sprite, 0, 0);
  }

  sprite: any;
}
