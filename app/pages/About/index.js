import aboutIntro from "animations/aboutIntro";
import { intro, outro } from "animations/flag";
import Page from "classes/Page";
import gsap from "gsap";
import fragmentShader from "shaders/About/flag-fragment.glsl";
import vertexShader from "shaders/About/flag-vertex.glsl";
import { Mesh, PlaneGeometry, ShaderMaterial } from "three";
import { split } from "utils/text";

export default class About extends Page {
  constructor() {
    super({
      element: ".about",
      id: "about",
      elements: {
        texts: ".about__text",
        medias: ".about__media",
        images: ".about__media__image",
        video: ".about__mobile__image",
      },
    });
  }

  /** Life Cycle */
  create() {
    super.create();
    this.reCalculate();
    this.placeMesh();
    this.elements.video.play();

    this.elements.texts.forEach((element) => {
      split({ element });
    });
    this.elements.spans = document.querySelectorAll(".about__text span");
    const introAnimation = aboutIntro(this.elements);
    const temp = setTimeout(() => {
      introAnimation.play();
      clearTimeout(temp);
    }, 1500);
  }
  update() {
    if (!this.material) return;
    this.material.uniforms.uTime.value = Canvas.time.elapsed;
  }
  predestroy() {
    if (this.isMobile) return;
    const animation = outro(
      this.mesh.material.uniforms.uOpacity,
      this.mesh.material.uniforms.uShade
    );
    Canvas.navigate = async () => {
      this.removeEventListeners && this.removeEventListeners();
      gsap.to(this.element, { autoAlpha: 0 });
      await animation.play();
      Canvas.scene.remove(this.mesh);
    };
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
    this.finalx =
      -(innerWidth / 2 - this.bounds.left) / innerWidth + this.width;

    if (!this.mesh) return;
    this.mesh.scale.x = this.width * Canvas.viewport.width;
    this.mesh.scale.y = this.height * Canvas.viewport.height;
    this.mesh.position.x = this.x * Canvas.viewport.width;
    this.mesh.position.y = this.y * Canvas.viewport.height;

    this.predestroy();
  }

  createGeometry() {
    this.geometry = new PlaneGeometry(1, 1, 32, 32);
  }
  createMaterial() {
    const texture = Canvas.textures[this.id];
    this.material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uOpacity: { value: 1 },
        uShade: { value: 1 },
      },
    });
  }
  createMesh() {
    this.mesh = new Mesh(this.geometry, this.material);
  }

  placeMesh() {
    const position = this.mesh.position;
    const scale = this.mesh.scale;
    const opacity = this.mesh.material.uniforms.uOpacity;
    const x = {
      initial: this.initialx,
      position: this.x,
      scale: this.width,
      constant: Canvas.viewport.width,
    };

    !this.isMobile && Canvas.scene.add(this.mesh);
    const animation = intro({ position, scale, x, opacity });
    animation.play();

    this.mesh.scale.y = this.height * Canvas.viewport.height;
    this.mesh.position.y = this.y * Canvas.viewport.height;

    this.predestroy();
  }
}
