export default class Router {
  constructor() {}

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
}
