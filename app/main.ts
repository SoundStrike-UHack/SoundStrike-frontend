// Game Engine
import {Renderer, SceneManager, Scene, KeyCode} from './lib/engine';

import {Background} from "./gameobjects/background";
import {Menu} from './gameobjects/menu';
import {NoteManager} from './gameobjects/notemanager';

var renderer: Renderer, sceneManager: SceneManager;

function start() {
  // Create Renderer
  renderer = new Renderer();
  var canvas: HTMLCanvasElement = renderer.canvas;
  canvas.width = 1280;
  canvas.height = 720;
  document.getElementById('gl-scene').appendChild(canvas);
  canvas.focus();

  // Create SceneManager and Levels
  sceneManager = new SceneManager();
  sceneManager.add(createMainScene());
  sceneManager.add(createScene());
}

function createMainScene() {
  var scene = new Scene({ position: { x: 0, y: 0 }, width: 1280, height: 720 }, 1280, 720)
  scene.add(new Menu());
  return scene;
}

function createScene() {
  var scene = new Scene({ position: { x: 0, y: 0 }, width: 1280, height: 720 }, 1280, 720)
  scene.add(new Background());
  return scene;
}

function animate() {
  renderer.update(sceneManager.current());
  renderer.render(sceneManager.current());
  requestAnimationFrame(animate);
}

start();
animate();
