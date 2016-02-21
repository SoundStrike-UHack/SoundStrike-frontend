import {GameObject, Scene} from '../lib/engine';

export class GUI extends GameObject {
  public myString;
  private player;
  private viewport;
  private score = 0;
  constructor() {
    super();
  }

  update(scene: Scene, input, deltaTime) {
    
  }
  render(context: CanvasRenderingContext2D) {
    context.fillStyle = "#ffffff";
    context.font = "16px 'Roboto'";
     if (this.viewport)
      context.fillText("Score: " + this.score, 16, 16);
  }
}
