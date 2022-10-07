import navigationHover from "animations/navigationHover";
import * as pageTransition from "animations/pageTransition";

export default class Router {
  constructor(app) {
    this.app = app;
    this.addTransitions();
  }

  reCalculate() {
    this.addTransitions();
  }

  async go({ target }) {
    const { href } = target;
    const request = await fetch(href);
    if (request.ok) {
      const html = await request.text();
      const div = document.createElement("div");
      div.innerHTML = html;
      const content = div.querySelector(".content");
      const template = content.getAttribute("data-template");
      return [content.innerHTML, template];
    } else {
      console.log(`could not fetch ${href}`);
    }
  }

  addTransitions() {
    const [navWrapper, rectWrapper] = this.app.page.elements.navWrapper;
    const rect = rectWrapper.getBoundingClientRect();
    navWrapper.style.opacity = 1;

    this.hover = navigationHover(navWrapper, rect);
    this.transitionOut = pageTransition.leave(navWrapper);
    this.transitionIn = pageTransition.enter(navWrapper);
  }
}
