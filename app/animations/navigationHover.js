import gsap from "gsap";

export default function navigationHover(navWrapper, rect) {
  const tl = gsap.timeline({ paused: true });
  tl.fromTo(
    navWrapper,
    {
      clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
      duration: 1.5,
    },
    {
      clipPath: `polygon(0% ${rect.y}px, 100% ${rect.y}px, 100% ${
        rect.y + rect.height
      }px, 0% ${rect.y + rect.height}px)`,
      ease: "expo",
      duration: 1,
    }
  );
  tl.fromTo(
    ".navigation__hover__list",
    { autoAlpha: 0.5, y: rect.height, duration: 0.5 },
    { autoAlpha: 1, y: 0, ease: "expo", duration: 0.5 },
    0.2
  );

  return tl;
}
