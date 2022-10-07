const navigationSelectors = {
  home: "#home",
  work: "#work",
  about: "#about",
  playground: "#playground",
  contact: "#contact",
};
const navigationHoverSelectors = {
  home: "#hoverHome",
  work: "#hoverWork",
  about: "#hoverAbout",
  playground: "#hoverPlayground",
  contact: "#hoverContact",
};

const pageElements = {
  navWrapper: ".navigation__wrapper",
  navHover: ".navigation__hover__list",
  hamburger: ".hamburger",
};

export default class Page {
  constructor({ element, elements, id }) {
    this.selector = element;
    this.childrenSelectors = { ...elements, ...pageElements };
    this.id = id;
  }

  create() {
    this.element = document.querySelector(this.selector);
    this.navigationElements = {};
    this.navigationHoverElements = {};
    this.elements = {};

    this.storePageAssets(this.navigationElements, navigationSelectors);
    this.storePageAssets(
      this.navigationHoverElements,
      navigationHoverSelectors
    );
    this.storePageAssets(this.elements, this.childrenSelectors);
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
