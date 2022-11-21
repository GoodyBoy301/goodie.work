import Component from "classes/Component";
import gsap from "gsap";

export default class Reveal extends Component {
  constructor(params) {
    super(params);
    this.animateIn = params.animateIn || this[params.animateIn] || this.curtain;
    this.createObserver();
  }

  createObserver() {
    const options = { threshold: 0.9 };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateIn(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    this.elements.images.forEach((image) => {
      this.observer.observe(image);
    });
  }

  curtain(element) {
    gsap.fromTo(
      element,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        autoAlpha: 1,
        scale: 1.05,
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        autoAlpha: 1,
        scale: 1,
        delay: element.getAttribute("data-delay"),
        duration: 0.5,
      }
    );
  }
}
