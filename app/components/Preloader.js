import Component from "classes/Component";
import * as preloader from "animations/preloader";
import { split } from "utils/text";

export default class Preloader extends Component {
  constructor() {
    super({
      element: ".preloader",
      elements: {
        text: ".preloader__text",
        progress: ".preloader__number",
        images: "img",
      },
    });
    split({ element: this.elements.text });
    this.length = 0;
    this.create();
  }

  create() {
    const { images } = this.elements;
    if (images) {
      images.forEach((element, index) => {
        element.src = element.getAttribute("data-src");
        element.onload = (_) => this.onAssetLoaded(element);
      });
    } else {
      this.elements.progress.innerText = "100%";
      requestAnimationFrame(() => this.onCompleted());
    }
  }
  onAssetLoaded(image) {
    this.length += 1;
    const percentage = Math.round(
      (this.length / this.elements.images.length) * 100
    );
    this.elements.progress.innerText = `${percentage}%`;
    if (percentage === 100) this.onCompleted();
  }

  async onCompleted() {
    await preloader.leave();
    this.dispatchEvent({ type: "preloaded" });
  }

  destroy() {
    this.element.parentElement.removeChild(this.element);
  }
}
