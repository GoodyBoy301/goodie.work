import gsap from "gsap";

export default class Page {
  constructor({ element, elements, id }) {
    this.id = id;
    this.element = document.querySelector(element);
    this.elements = {};

    this.storePageAssets(this.elements, { ...elements });
  }

  create() {}

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
