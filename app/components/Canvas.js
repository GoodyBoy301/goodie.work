import {
  CineonToneMapping,
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  WebGLRenderer,
} from "three";
import time from "utils/time";

export default class Canvas {
  constructor() {
    this.create();
    window.Canvas = this;
  }

  create() {
    this.createRenderer();
    this.createScene();
    this.createCamera();
    this.reCalculate();
    this.time = new time();
    this.canvas = this.renderer?.domElement;
    document.body.appendChild(this.canvas);
  }

  update() {
    if (this.composer) this.composer.render();
    else this.renderer.render(this.scene, this.camera);
    this.time.update();
  }

  reCalculate() {
    this.mouseTracker = {
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
    };
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.setSize(innerWidth, innerHeight);
    this.fov = this.camera.fov * (Math.PI / 180);
    const height = 2 * Math.tan(this.fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { height, width };
  }

  createRenderer() {
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.toneMapping = CineonToneMapping;
    this.renderer.toneMappingExposure = 1.75;
    this.renderer.setClearColor("#eaecee", 0.0);
    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  }

  createScene() {
    this.scene = new Scene();
  }

  createCamera() {
    this.camera = new PerspectiveCamera(35, innerWidth / innerHeight, 0.1, 100);
    this.camera.position.z = 5;
    this.scene.add(this.camera);
  }
}
