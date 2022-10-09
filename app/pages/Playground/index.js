import Page from "classes/Page";
import { lerp, clamp } from "utils/math";
import Prefix from "prefix";

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
    const { deltaX, deltaY } = event;
    this.scroll.target += deltaY + deltaX;
    this.scroll.target = clamp(0, this.scroll.target, this.scroll.limit);
    if (this.scroll.target < 0) this.scroll.target = 0;
  }

  smoothScroll() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, 0.1);
    this.scroll.current = clamp(0, this.scroll.limit, this.scroll.current);
    if (this.scroll.current < 0.1) this.scroll.current = 0;
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
  }
  removeEventListeners() {
    window.removeEventListener("mousewheel", this.onMousewheel.bind(this));
  }
}
