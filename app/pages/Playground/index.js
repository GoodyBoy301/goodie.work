import Page from "classes/Page";
import gsap from "gsap";
import NormalizeWheel from "normalize-wheel";
import Prefix from "prefix";
import { clamp, lerp } from "utils/math";
import Reveal from "classes/Reveal";

export default class Playground extends Page {
  constructor() {
    super({
      element: ".playground",
      id: "playground",
      elements: {
        projectWrapper: ".playground__projects__wrapper",
        title: ".playground__heading__text",
        titleSpans: ".playground__heading__text span",
        body: ".playground__body",
        projects: ".playground__project",
      },
    });
  }

  /** Life Cycle */
  create() {
    super.create();
    this.reCalculate();
    this.createPalletes();
    this.transformPrefix = Prefix("transform");
    this.Revealer = new Reveal({
      elements: { images: ".playground__project__image" },
    });
  }
  update() {
    this.scroll && this.smoothScroll();
    this.elements?.titleSpans && this.movetext();
  }
  destroy() {
    this.Revealer.observer.disconnect();
  }

  reCalculate() {
    this.isMobile = innerWidth < 768;
    this.scroll = {
      current: 0,
      target: 0,
      last: { x: 0, y: 0 },
      limit: this.elements.projectWrapper.clientWidth - window.innerWidth,
    };
    this.marquee = [];
    this.elements.titleSpans.forEach((element) => {
      const rect = element.getBoundingClientRect();
      this.marquee.push({
        end: -(rect.right + innerWidth * 0.65),
        start: innerWidth * 0.9 - rect.left,
        current: 0,
        speed: 1,
      });
    });
  }

  onMousewheel(event) {
    const { pixelX, pixelY } = NormalizeWheel(event);
    const pixel = clamp(
      0,
      this.scroll.target + pixelY + pixelX,
      this.scroll.limit
    );
    this.scroll.target = pixel < 0 ? 0 : pixel;
  }

  onTouchDown(event) {
    this.isDown = true;
    const clientX = event.clientX || event.touches[0]?.clientX;
    const clientY = event.clientY || event.touches[0]?.clientY;
    this.scroll.last.x = clientX;
    this.scroll.last.y = clientY;
  }

  onTouchMove(event) {
    if (!this.isDown) return;
    const clientX = event.clientX || event.touches[0]?.clientX;
    const clientY = event.clientY || event.touches[0]?.clientY;
    const client = this.scroll.last.x - clientX + this.scroll.last.y - clientY;
    const pixel = clamp(0, this.scroll.target + client, this.scroll.limit);
    this.scroll.target = pixel < 0 ? 0 : pixel;
  }

  onTouchUp() {
    this.isDown = false;
  }

  smoothScroll() {
    const scrollTo = clamp(
      0,
      this.scroll.limit,
      lerp(this.scroll.current, this.scroll.target, 0.1)
    );
    this.scroll.current = scrollTo < 0.01 ? 0 : scrollTo;
    this.elements.projectWrapper.style[
      this.transformPrefix
    ] = `translateX(-${this.scroll.current}px)`;
  }
  movetext() {
    this.elements.titleSpans.forEach((element, index) => {
      if (!this.isMobile) {
        element.style[this.transformPrefix] = "";
        return;
      }
      this.marquee[index].current -= this.marquee[index].speed;
      element.style[
        this.transformPrefix
      ] = `translateX(${this.marquee[index].current}px)`;
    });
  }

  createPalletes() {
    const { body, projects } = this.elements;
    projects.forEach((project) => {
      project.onmouseover = () => this.changeColor(project);
      project.onmouseleave = () => this.changeColor(body);
    });
  }
  changeColor(element) {
    gsap.to(this.elements.body, {
      background: element.getAttribute("data-color"),
      duration: 1,
      ease: "expo",
    });
  }
  tint() {}

  addEventListeners() {
    window.addEventListener("mousewheel", this.onMousewheel.bind(this));
    window.addEventListener("touchstart", this.onTouchDown.bind(this));
    window.addEventListener("touchmove", this.onTouchMove.bind(this));
    window.addEventListener("touchend", this.onTouchUp.bind(this));
  }
  removeEventListeners() {
    window.removeEventListener("mousewheel", this.onMousewheel.bind(this));
    window.removeEventListener("touchstart", this.onTouchDown.bind(this));
    window.removeEventListener("touchmove", this.onTouchMove.bind(this));
    window.removeEventListener("touchend", this.onTouchUp.bind(this));
  }
}
