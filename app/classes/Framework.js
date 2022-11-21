import Router from "classes/Router";
import Preloader from "components/Preloader";
import Navigation from "components/Navigation";
import Canvas from "components/Canvas";

export default class Framework {
  constructor() {
    this.reCalculate();
    this.createCanvas();
    this.createPreloader();
    this.createContent();
    this.addEventListeners();
    this.createNavigation();
    this.createRouter();
  }

  reCalculate() {
    this.isMobile = innerWidth < 768;
    this.canvas?.reCalculate();
  }

  createPreloader() {
    this.preloader = new Preloader();
    this.preloader.addEventListener("preloaded", this.onPreloaded.bind(this));
  }
  onPreloaded() {
    this.createPages();
    this.page.create();
  }

  createNavigation() {
    this.navigation = new Navigation();
    this.navigation.addEventListener("completed", this.onNavigate.bind(this));
  }
  async onNavigate({ event, push = true }) {
    const [html, template] = await this.router.go(event);
    this.page.destroy();
    this.content.innerHTML = html;
    this.content.setAttribute("data-template", template);
    this.createContent();
    push && history.pushState({}, "", template);
    this.page = this.pages[this.template];
    this.page.create();
  }
  async onBack() {
    const params = { target: { href: window.location.pathname } };
    this.onNavigate({ event: params, push: false });
  }

  createCanvas() {
    this.canvas = new Canvas();
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
    window.addEventListener("popstate", this.onBack.bind(this));
  }
}
