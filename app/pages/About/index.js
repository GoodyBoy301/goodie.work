import Page from "classes/Page";
import { split } from "utils/text";
import aboutIntro from "animations/aboutIntro";
import flagIntro from "animations/flagIntro";
import fragmentShader from "shaders/About/flag-fragment.glsl";
import vertexShader from "shaders/About/flag-vertex.glsl";
import { Mesh, ShaderMaterial, TextureLoader, PlaneGeometry } from "three";

export default class About extends Page {
  constructor() {
    super({
      element: ".about",
      id: "about",
      elements: {
        texts: ".about__text",
        medias: ".about__media",
        images: ".about__media__image",
      },
    });
  }

  /** Life Cycle */
  create() {
    super.create();
    this.reCalculate();
    !this.geometry && this.createGeometry();
    !this.material && this.createMaterial();
    !this.mesh && this.createMesh();
    this.placeMesh();

    this.elements.texts.forEach((element) => {
      split({ element });
    });
    this.elements.spans = document.querySelectorAll(".about__text span");
    const introAnimation = aboutIntro(this.elements);
    introAnimation.play();
    console.log(this.mesh.position);
  }
  update() {
    if (!this.material) return;
    this.material.uniforms.uTime.value = Canvas.time.elapsed;
  }
  destroy() {
    Canvas.scene.remove(this.mesh);
  }

  reCalculate() {
    this.isMobile = innerWidth < 768;
    this.flagImage = this.elements.images[2];
    this.bounds = this.flagImage.getBoundingClientRect();
    this.width = this.bounds.width / innerWidth;
    this.height = this.bounds.height / innerHeight;
    this.y =
      (innerHeight / 2 - this.bounds.top - this.bounds.height / 2) /
      innerHeight;
    this.x =
      -(innerWidth / 2 - this.bounds.left - this.bounds.width / 2) / innerWidth;
    this.initialx = -(innerWidth / 2 - this.bounds.left) / innerWidth;

    if (!this.mesh) return;
    this.mesh.scale.x = this.width * Canvas.viewport.width;
    this.mesh.scale.y = this.height * Canvas.viewport.height;
    this.mesh.position.x = this.x * Canvas.viewport.width;
    this.mesh.position.y = this.y * Canvas.viewport.height;
  }

  createGeometry() {
    this.geometry = new PlaneGeometry(1, 1, 32, 32);
  }
  createMaterial() {
    const texture = new TextureLoader().load(
      this.flagImage.getAttribute("src")
    );
    this.material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
      },
    });
  }
  createMesh() {
    this.mesh = new Mesh(this.geometry, this.material);
  }

  placeMesh() {
    const position = this.mesh.position;
    const scale = this.mesh.scale;
    const x = {
      initial: this.initialx,
      position: this.x,
      scale: this.width,
      constant: Canvas.viewport.width,
    };

    !this.isMobile && Canvas.scene.add(this.mesh);
    const animation = flagIntro({ position, scale, x });
    animation.play();

    this.mesh.scale.y = this.height * Canvas.viewport.height;
    this.mesh.position.y = this.y * Canvas.viewport.height;
  }
}
