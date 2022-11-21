import { intro, outro } from "animations/mesh";
import Page from "classes/Page";
import gsap from "gsap";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer";
import { RenderPass } from "three/addons/postprocessing/RenderPass";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass";
import { LuminosityShader } from "three/addons/shaders/LuminosityShader";
import { lerp } from "utils/math";

export default class Home extends Page {
  constructor() {
    super({
      element: ".contact",
      id: "home",
      elements: {
        slot: ".contact__canvas__illustration",
      },
    });
  }

  create() {
    super.create();
    this.reCalculate();
    this.placeMesh();
    this.postProcess();
  }

  update() {
    if (this.mesh) this.updateMesh();
  }
  predestroy() {
    if (this.isMobile) return;
    const animation = outro(this.mesh.children[0].material);
    Canvas.navigate = async () => {
      this.removeEventListeners && this.removeEventListeners();
      gsap.to(this.element, { autoAlpha: 0 });
      await animation.play();
      Canvas.composer = null;
      this.mesh.scale.set(0, 0, 0);
    };
  }
  destroy() {
    Canvas.scene.remove(this.mesh);
  }

  reCalculate() {
    this.isMobile = innerWidth < 768;
    this.scale = this.isMobile ? 0.6 : 0.35;
    this.innerWidth = innerWidth;
    this.innerHeight = innerHeight;

    this.bounds = this.elements.slot.getBoundingClientRect();
    this.width = this.bounds.width / innerWidth;
    this.height = this.bounds.height / innerHeight;
    this.y =
      (innerHeight / 2 - this.bounds.top - this.bounds.height / 2) /
      innerHeight;
    this.x =
      -(innerWidth / 2 - this.bounds.left - this.bounds.width / 2) / innerWidth;
    this.initialx = -(innerWidth / 2 - this.bounds.left) / innerWidth;

    if (!this.mesh) return;
    this.mesh.scale.x = this.height * Canvas.viewport.width * this.scale;
    this.mesh.scale.y = this.height * Canvas.viewport.width * this.scale;
    this.mesh.scale.z = this.height * Canvas.viewport.width * this.scale;
    this.mesh.position.x = this.x * Canvas.viewport.width;
    this.mesh.position.y = this.y * Canvas.viewport.height;

    this.predestroy();
  }

  createGeometry() {
    if (this.geometry) return;
    this.geometry = Canvas.exports[this.id];
  }
  createMaterial() {
    if (this.material) return;
    this.material = Canvas.materials[this.id];
  }
  createMesh() {
    if (this.mesh) return;
    const baked = this.geometry.children.find(
      (child) => child.name === "baked"
    );
    baked.material = this.material;
    this.mesh = this.geometry;
  }

  placeMesh() {
    Canvas.scene.add(this.mesh);
    this.mesh.scale.x = this.height * Canvas.viewport.width * this.scale;
    this.mesh.scale.y = this.height * Canvas.viewport.width * this.scale;
    this.mesh.scale.z = this.height * Canvas.viewport.width * this.scale;
    this.mesh.position.x = this.x * Canvas.viewport.width;
    this.mesh.position.y = this.y * Canvas.viewport.height;

    const animation = intro(this.mesh.children[0].material);
    animation.play();

    this.predestroy();
  }
  updateMesh() {
    const x = lerp(
      Canvas.mouseTracker.currentX,
      Canvas.mouseTracker.targetX,
      0.1
    );
    const y = lerp(
      Canvas.mouseTracker.currentY,
      Canvas.mouseTracker.targetY,
      0.1
    );
    this.mesh.rotation.x = y;
    this.mesh.rotation.y = x;
    Canvas.mouseTracker.currentX = x;
    Canvas.mouseTracker.currentY = y;
  }

  postProcess() {
    const composer = new EffectComposer(Canvas.renderer);
    const renderPass = new RenderPass(Canvas.scene, Canvas.camera);
    composer.addPass(renderPass);
    const effectGrayScale = new ShaderPass(LuminosityShader);
    composer.addPass(effectGrayScale);
    Canvas.composer = composer;
  }

  onMouseMove(event) {
    const target = {};
    const clientX = event.touches ? event.touches[0]?.clientX : event.clientX;
    const clientY = event.touches ? event.touches[0]?.clientY : event.clientY;
    target.x = (clientX / this.innerWidth - 0.5) * 2;
    target.y = (clientY / this.innerHeight - 0.5) * 0.25;
    Canvas.mouseTracker.targetX = target.x;
    Canvas.mouseTracker.targetY = target.y;
  }

  addEventListeners() {
    window.onmousemove = this.onMouseMove.bind(this);
    window.ontouchmove = this.onMouseMove.bind(this);
  }
  removeEventListeners() {
    window.onmousemove = () => {};
    window.ontouchmove = () => {};
  }
}
