import Page from "classes/Page";
import gsap from "gsap";
import { split } from "utils/text";
import aboutIntro from "animations/aboutIntro";

export default class About extends Page {
  constructor() {
    super({
      element: ".about",
      id: "about",
      elements: {
        texts: ".about__text",
        medias: ".about__media",
        images: ".about__media__image",
      },
    });
  }

  /** Life Cycle */
  create() {
    super.create();
    this.reCalculate();
    this.elements.texts.forEach((element) => {
      split({ element });
    });
    this.elements.spans = document.querySelectorAll(".about__text span");
    const introAnimatiom = aboutIntro(this.elements);
    introAnimatiom.play();
  }

  reCalculate() {
    this.isMobile = innerWidth < 768;
  }
}
