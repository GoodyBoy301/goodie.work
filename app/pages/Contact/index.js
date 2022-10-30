import Page from "classes/Page";
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

  async create() {
    super.create();
    this.reCalculate();
    this.createGeometry();
    this.createMaterial();
    this.createMesh();
    this.placeMesh();
  }

  update() {
    if (this.mesh) this.updateMesh();
  }
  destroy() {
    super.destroy();
    Canvas.scene.remove(this.mesh);
  }

  reCalculate() {
    this.isMobile = innerWidth < 768;
    this.scale = this.isMobile ? 0.5 : 0.35;
    this.innerWidth = innerWidth;
    this.innerHeight = innerHeight;
    this.mouseTracker = {
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
    };
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
  }
  updateMesh() {
    const x = lerp(this.mouseTracker.currentX, this.mouseTracker.targetX, 0.1);
    const y = lerp(this.mouseTracker.currentY, this.mouseTracker.targetY, 0.1);
    this.mesh.rotation.x = y;
    this.mesh.rotation.y = x;
    this.mouseTracker.currentX = x;
    this.mouseTracker.currentY = y;
  }

  onMouseMove(event) {
    const target = {};
    const clientX = event.touches ? event.touches[0]?.clientX : event.clientX;
    const clientY = event.touches ? event.touches[0]?.clientY : event.clientY;
    target.x = (clientX / this.innerWidth - 0.5) * 2;
    target.y = (clientY / this.innerHeight - 0.5) * 0.25;
    this.mouseTracker.targetX = target.x;
    this.mouseTracker.targetY = target.y;
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
