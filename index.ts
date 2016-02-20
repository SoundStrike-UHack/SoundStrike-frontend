class App {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  constructor() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("gl-scene").appendChild(this.renderer.domElement)


  }
}
