import {GameObject, Scene, Easing, Input} from '../lib/engine';

export class Menu extends GameObject {
  private logo: HTMLImageElement;

  private scene: Scene;
  private alpha = 0;
  private startgame = false;
  private elapsedTime = 0;
  constructor() {
    super();
    this.logo = new Image();
    this.logo.src = 'assets/brand/logo.png';
  }

  update(scene: Scene, input: Input, deltaTime: number) {
    this.scene = scene;
    this.elapsedTime += deltaTime;

    if (!this.startgame && input.mouseClick()) {
      this.startgame = true;
      this.elapsedTime = 0;
      console.log(this.elapsedTime);
    }

    // Fade in and Fade out
    if (this.startgame) {
      this.alpha = Easing.easeOutExpo(1 - this.elapsedTime*0.5, 0, 1, 1);
      if (this.alpha <= 0) {
        this.alpha = 0;
        scene.next();
      }
    }
    else {
      this.alpha = Easing.easeOutExpo(this.elapsedTime*0.5, 0, 1, 1);
    }
  }

  render(context: CanvasRenderingContext2D) {
    if (this.scene) {
    var vx = this.scene.viewport.position.x + (this.scene.viewport.width / 2);
    var vy = this.scene.viewport.position.y + (this.scene.viewport.height / 2);
    context.save();
    context.globalAlpha = this.alpha;
    context.drawImage(this.logo,
      vx - (this.logo.width / 4),
      vy - (this.logo.height / 4), this.logo.width/2, this.logo.height/2);
    context.restore();
  }
  }
}
