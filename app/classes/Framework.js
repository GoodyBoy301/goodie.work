import Router from "classes/Router";
import Preloader from "components/Preloader";
import Navigation from "components/Navigation";

export default class Framework {
  constructor() {
    this.isMobile = innerWidth < 768;
    this.createPreloader();
    this.createContent();
    this.addEventListeners();
    this.createNavigation();
    this.createRouter();
  }

  reCalculate() {
    this.isMobile = innerWidth < 768;
  }

  createPreloader() {
    this.preloader = new Preloader();
    this.preloader.addEventListener("preloaded", this.onPreloaded.bind(this));
  }
  onPreloaded() {
    this.preloader.destroy();
    this.page.create();
  }

  createNavigation() {
    this.navigation = new Navigation();
    this.navigation.addEventListener("completed", this.onNavigate.bind(this));
  }
  async onNavigate({ event }) {
    const [html, template] = await this.router.go(event);
    this.content.innerHTML = html;
    this.content.setAttribute("data-template", template);
    history.pushState({}, "", template);
  }

  createContent() {
    this.content = document.querySelector(".content");
    this.template = this.content.getAttribute("data-template");
  }

  createRouter() {
    this.router = new Router();
  }

  onResize() {
    this.reCalculate && this.reCalculate();
    this.page.reCalculate && this.page.reCalculate();
    this.router.reCalculate && this.router.reCalculate();
    this.navigation.reCalculate && this.navigation.reCalculate();
  }

  addEventListeners() {
    window.addEventListener("resize", this.onResize.bind(this));
  }
}
