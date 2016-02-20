"use strict";
var Midi = require("./midi");
var App = (function () {
    function App() {
        var _this = this;
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("gl-scene").appendChild(this.renderer.domElement);
        this.camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / -2, window.innerHeight / 2, -500, 1000);
        this.camera.position.set(0, 0, -100);
        window.addEventListener('resize', function () {
            return _this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
        var light = new THREE.AmbientLight(0x404040);
        this.scene.add(light);
    }
    return App;
}());
var app = new App();
var midiListener = new Midi.MidiListener();
