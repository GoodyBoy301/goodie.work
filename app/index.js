import Home from "pages/Home";
import Work from "pages/Work";
import About from "pages/About";
import Playground from "pages/Playground";
import Contact from "pages/Contact";
import Framework from "classes/Framework";

class App extends Framework {
  constructor() {
    super();
    this.createPages();
    this.addLinkListeners();
    this.createHamburger();
  }

  createPages() {
    this.pages = {
      home: new Home(),
      work: new Work(),
      about: new About(),
      playground: new Playground(),
      contact: new Contact(),
    };
    this.page = this.pages[this.template];
    this.page.create();
    this.createRouter();
  }

  addLinkListeners() {
    const links = this.page.navigationElements;

    Object.entries(links).forEach(([key, link]) => {
      if (links instanceof HTMLElement) {
        link.onmouseenter = this.linkHoverListener.bind(this);
        link.onmouseleave = this.linkBlurListener.bind(this);
        link.onclick = this.linkClickListener.bind(this);
      } else if (link instanceof NodeList) {
        const links = link;
        links.forEach((link) => {
          link.onmouseenter = this.linkHoverListener.bind(this);
          link.onmouseleave = this.linkBlurListener.bind(this);
          link.onclick = this.linkClickListener.bind(this);
        });
      }
    });
  }

  createHamburger() {
    const hamburger = this.page.elements.hamburger;

    if (hamburger instanceof HTMLElement) {
      link.onclick = this.onMenuClick.bind(this);
    } else if (hamburger instanceof NodeList) {
      hamburger.forEach((link) => {
        link.onclick = this.onMenuClick.bind(this);
      });
    }
  }
}

new App();
