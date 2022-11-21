import gsap from "gsap";
import { midTitle, bigTitle, subTitle } from "animations/title";

export default class Page {
  constructor({ element, elements, id }) {
    this.id = id;
    this.selector = element;
    this.children = { ...elements };
    this.createWebGL();
  }

  /** Life Cycle */
  create() {
    this.element = document.querySelector(this.selector);
    this.elements = {};
    this.storePageAssets(this.elements, this.children);
    this.addEventListeners && this.addEventListeners();

    const animation = midTitle() || bigTitle();
    const textanimation = subTitle();
    animation.play();
    textanimation?.play();
    this.predestroy();
  }
  createWebGL() {
    this.createGeometry?.call(this);
    this.createMaterial?.call(this);
    this.createMesh?.call(this);
  }
  predestroy() {
    Canvas.navigate = () => {
      this.removeEventListeners && this.removeEventListeners();
      gsap.to(this.element, { autoAlpha: 0 });
    };
  }
  destroy() {}

  storePageAssets(collection, entries) {
    Object.entries(entries).forEach(([key, value]) => {
      if (
        value instanceof HTMLElement ||
        value instanceof NodeList ||
        Array.isArray(value)
      ) {
        collection[key] = value;
      } else {
        collection[key] = document.querySelectorAll(value);
        if (collection[key].length === 0) collection[key] = null;
        else if (collection[key].length === 1)
          collection[key] = document.querySelector(value);
      }
    });
  }
}
