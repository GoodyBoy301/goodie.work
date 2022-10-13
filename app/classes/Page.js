import gsap from "gsap";

export default class Page {
  constructor({ element, elements, id }) {
    this.id = id;
    this.selector = element;
    this.children = { ...elements };
  }

  /** Life Cycle */
  create() {
    this.element = document.querySelector(this.selector);
    this.elements = {};
    this.storePageAssets(this.elements, this.children);
    this.addEventListeners && this.addEventListeners();
  }

  destroy() {
    this.removeEventListeners && this.removeEventListeners();
    gsap.to(this.element, { autoAlpha: 0 });
  }

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
