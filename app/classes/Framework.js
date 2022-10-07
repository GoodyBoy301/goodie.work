import Router from "classes/Router";
import gsap from "gsap";
import menuClick from "../animations/menuClick";

export default class Framework {
  constructor() {
    this.isMobile = innerWidth < 768;

    this.createContent();
    this.addEventListeners();
    this.createAnimations();
  }

  reCalculate() {
    this.isMobile = innerWidth < 768;
    this.createAnimations();
  }

  createContent() {
    this.content = document.querySelector(".content");
    this.template = this.content.getAttribute("data-template");
  }

  createRouter() {
    this.router = new Router(this);
  }

  async changePage(event) {
    const [html, template] = await this.router.go(event);
    this.content.innerHTML = html;
    this.content.setAttribute("data-template", template);
    history.pushState({}, "", template);
  }

  createAnimations() {
    if (this.isMobile) this.menuAnimation = menuClick();
    else {
      gsap.set(".navigation", {
        autoAlpha: 1,
        display: "block",
      });
      gsap.set(".navigation__list__item", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%",
        y: 0,
      });
    }
  }

  /*=== Event Listeners ===*/
  linkHoverListener(event) {
    if (this.router.isNavigating === true || this.isMobile) return;
    const [navHover] = this.page.elements.navHover;
    const [content] = this.page.navigationHoverElements[event.target.id];
    navHover.innerHTML = content.innerHTML;
    this.router.hover.play();
  }

  linkBlurListener(event) {
    if (this.router.isNavigating === true || this.isMobile) return;
    this.router.hover.reverse();
  }

  async linkClickListener(event) {
    event.preventDefault();
    if (this.router.isNavigating) return;
    if (this.isMobile) {
      if (this.menuAnimation.done) {
        this.menuAnimation.reverse();
        await this.changePage(event);
        this.menuAnimation.reverse();
        this.menuAnimation.done = !this.menuAnimation.done;
      } else {
        this.onMenuClick();
      }
    } else {
      this.router.isNavigating = true;
      this.router.hover.progress(1);
      await this.router.transitionOut.restart();
      await this.changePage(event);
      await this.router.transitionIn.restart();
      // this.router.hover.progress(0);
      this.router.hover.pause(0);
      this.router.isNavigating = false;
    }
  }

  async onMenuClick() {
    if (this.menuAnimation.done) this.menuAnimation.reverse();
    else this.menuAnimation.play();
    this.menuAnimation.done = !this.menuAnimation.done;
  }

  onResize() {
    this.reCalculate && this.reCalculate();
    this.page.reCalculate && this.page.reCalculate();
    this.router.reCalculate && this.router.reCalculate();
  }

  addEventListeners() {
    window.addEventListener("resize", this.onResize.bind(this));
  }
}
