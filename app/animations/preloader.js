import gsap from "gsap";

export function leave() {
  return new Promise((resolve) => {
    const tl = gsap.timeline({ onComplete: resolve });

    tl.fromTo(
      ".preloader__text span, .preloader__number",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%",
        y: 0,
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%",
        y: "100%",
        duration: 2,
        ease: "expo",
        stagger: 0.1,
        delay: 2,
      }
    );
    // tl.to(".preloader", { autoAlpha: 0, ease: "expo" });
    tl.to(".preloader", { scaleY: 0, ease: "expo" });
  });
}
