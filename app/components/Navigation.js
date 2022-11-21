import gsap from "gsap";
import Component from "classes/Component";
import menuClick from "animations/menuClick";
import navigationHover from "animations/navigationHover";
import * as pageTransition from "animations/pageTransition";

const elements = {
  home: "#home, #Home",
  work: "#work, #Work",
  about: "#about, #About",
  playground: "#playground, #Playground",
  contact: "#contact, #Contact",
  homeHover: "#hoverHome",
  workHover: "#hoverWork",
  aboutHover: "#hoverAbout",
  playgroundHover: "#hoverPlayground",
  contactHover: "#hoverContact",
  navWrapper: ".navigation__wrapper",
  navHover: ".navigation__hover__list",
  hamburger: ".hamburger",
};
const links = ["home", "work", "about", "playground", "contact"];

export default class Navigation extends Component {
  constructor() {
    super({
      element: ".navigation",
      elements,
    });
    this.isMobile = innerWidth < 768;
    this.create();
    this.addLinkListeners();
    this.createHamburger();
  }

  create() {
    if (this.isMobile) {
      this.menuAnimation = menuClick();
    } else {
      this.reset();
    }
    const [navWrapper, rectWrapper] = this.elements.navWrapper;
    const rect = rectWrapper.getBoundingClientRect();
    navWrapper.style.opacity = 1;
    this.hoverAnimation = navigationHover(navWrapper, rect);
    this.transitionOut = pageTransition.leave(navWrapper);
    this.transitionIn = pageTransition.enter(navWrapper);
  }

  reCalculate() {
    this.isMobile = innerWidth < 768;
    this.create();
  }

  reset() {
    gsap.set(".navigation", {
      autoAlpha: 1,
      display: "block",
    });
    gsap.set(".navigation__list__item", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%",
      y: 0,
    });
  }

  addLinkListeners() {
    const linkNodes = [];
    links.forEach((link) => {
      linkNodes.push(...this.elements[link]);
    });
    linkNodes.forEach((link) => {
      link.onmouseenter = this.linkHoverListener.bind(this);
      link.onmouseleave = this.linkBlurListener.bind(this);
      link.onclick = this.linkClickListener.bind(this);
    });
  }

  createHamburger() {
    const hamburger = this.elements.hamburger;
    hamburger.forEach((link) => {
      link.onclick = this.onMenuClick.bind(this);
    });
  }

  /*=== Event Listeners ===*/
  linkHoverListener(event) {
    if (this.isNavigating === true || this.isMobile) return;
    const [navHover] = this.elements.navHover;
    const [content] = this.elements[`${event.target.id.toLowerCase()}Hover`];
    navHover.innerHTML = content.innerHTML;
    this.hoverAnimation.play();
  }

  linkBlurListener(event) {
    if (this.isNavigating === true || this.isMobile) return;
    this.hoverAnimation.reverse();
  }

  async linkClickListener(event) {
    event.preventDefault();
    if (this.isNavigating) return;
    if (this.isMobile) {
      if (this.menuAnimation.done) {
        Canvas.navigate();
        this.menuAnimation.reverse();
        await this.dispatchEvent({ type: "completed", event });
        this.menuAnimation.reverse();
        this.menuAnimation.done = !this.menuAnimation.done;
      } else {
        this.onMenuClick();
      }
    } else {
      Canvas.navigate();
      this.isNavigating = true;
      this.hoverAnimation.progress(1);
      await this.transitionOut.restart();
      await this.dispatchEvent({ type: "completed", event });
      await this.transitionIn.restart();
      this.hoverAnimation.pause(0);
      this.isNavigating = false;
    }
  }

  async onMenuClick() {
    if (this.menuAnimation.done) this.menuAnimation.reverse();
    else this.menuAnimation.play();
    this.menuAnimation.done = !this.menuAnimation.done;
  }
}
