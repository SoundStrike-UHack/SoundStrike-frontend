import THREE from 'three';

export class SceneManager {
  constructor() {
    var sceneNode = document.getElementById("gl-scene");
    this.scene = new THREE.Scene();

    var WIDTH = sceneNode.clientWidth;
    var HEIGHT = sceneNode.clientHeight;

    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(WIDTH, HEIGHT);

    this.camera = new THREE.OrthographicCamera(WIDTH / -2, WIDTH / 2,
                                               HEIGHT / -2, HEIGHT / 2,
                                               -500, 1000);

   this.camera.position.set(0, 0, 200);
   this.scene.add(this.camera);

   var light = new THREE.AmbientLight(0x404040);
   this.scene.add(light);

   window.addEventListener('resize', function() {
     WIDTH = sceneNode.clientWidth;
     HEIGHT = sceneNode.clientHeight;

     this.renderer.setSize(WIDTH, HEIGHT);
     this.camera.aspect = WIDTH/HEIGHT;
     this.camera.updateProjectionMatrix();
   });

   this.loadModel();
   this.renderer.setClearColor(0xF0F0F0);
   sceneNode.appendChild(this.renderer.domElement);
  }

  loadModel() {
    var loader = new THREE.JSONLoader();
    loader.load("./assets/models/whole.json", function(g) {
      var mat = new THREE.MeshBasicMaterial({color: 0x000000});
      var mesh = new THREE.Mesh(g, mat);

      this.scene.add(mesh);

    });
  }

  render() {
    requestAnimationFrame(this.render);

    this.renderer.render(this.scene, this.camera);
  }

  scene: THREE.Scene
  renderer: THREE.WebGLRenderer
  camera: THREE.OrthographicCamera
}
