import {SessionManager} from "./app/SessionManager";
// Game Engine
import {Renderer, SceneManager, Scene, KeyCode} from './app/lib/engine';

import {Background} from "./app/gameObjects/background";

var renderer: Renderer,
  sceneManager: SceneManager;

function start() {
  // Create Renderer
  renderer = new Renderer();
  var canvas: HTMLCanvasElement = renderer.canvas;
  document.getElementById('gl-scene').appendChild(canvas);
  canvas.focus();

  var mainScene = new Scene({ position: { x: 64, y: 64 }, width: 640, height: 360 }, 1280, 720)
  mainScene.add(new Background());
  // Create SceneManager and Levels
  sceneManager = new SceneManager();
  sceneManager.add(mainScene);
}


function animate() {
  renderer.update(sceneManager.current());
  renderer.render(sceneManager.current());
  requestAnimationFrame(animate);
}

start();
animate();
console.log("Started");

var sessionMgr = new SessionManager();
