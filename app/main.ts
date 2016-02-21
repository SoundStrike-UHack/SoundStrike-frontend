// Game Engine
import {Renderer, SceneManager, Scene, KeyCode} from './lib/engine';

import {Background} from "./gameObjects/background";

var renderer: Renderer,
  sceneManager: SceneManager;

function start() {
  // Create Renderer
  renderer = new Renderer();
  var canvas: HTMLCanvasElement = renderer.canvas;
  document.getElementById('game').appendChild(canvas);
  canvas.focus();

  // Create SceneManager and Levels
  sceneManager = new SceneManager();
}


function animate() {
  renderer.update(sceneManager.current());
  renderer.render(sceneManager.current());
  requestAnimationFrame(animate);
}

start();
animate();
console.log("Started");
