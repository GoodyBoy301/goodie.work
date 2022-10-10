import Page from "classes/Page";
import { lerp, clamp } from "utils/math";
import Prefix from "prefix";
import NormalizeWheel from "normalize-wheel";

export default class Playground extends Page {
  constructor() {
    super({
      element: ".playground",
      id: "playground",
      elements: {
        projectWrapper: ".playground__projects__wrapper",
        title: ".playground__heading__text",
        titleSpans: ".playground__heading__text span",
      },
    });
  }

  /** Life Cycle */
  create() {
    super.create();
    this.reCalculate();
    this.transformPrefix = Prefix("transform");
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

  update() {
    this.scroll && this.smoothScroll();
    this.elements?.titleSpans && this.movetext();
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
      if (this.marquee[index].current < this.marquee[index].end)
        this.marquee[index].current = this.marquee[index].start;
      element.style[
        this.transformPrefix
      ] = `translateX(${this.marquee[index].current}px)`;
    });
  }

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
