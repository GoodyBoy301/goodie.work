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
    // this.page.create();
    this.createRouter();
  }
}

new App();
