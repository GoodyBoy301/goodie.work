import { EventDispatcher } from "three";

export default class Component extends EventDispatcher {
  constructor({ element, elements }) {
    super();
    this.element = document.querySelector(element);
    this.elements = {};

    this.storeComponentAssets(this.elements, { ...elements });
  }

  storeComponentAssets(collection, entries) {
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
