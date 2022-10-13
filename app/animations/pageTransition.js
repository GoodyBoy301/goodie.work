import gsap from "gsap";

export function leave(navWrapper) {
  const tl = gsap.timeline({ paused: true });

  tl.to(navWrapper, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ease: "expo",
    duration: 2,
  });
  tl.to(
    ".navigation__list",
    {
      autoAlpha: 0,
      ease: "expo",
      duration: 0.5,
    },
    0
  );

  return tl;
}

export function enter(navWrapper) {
  const tl = gsap.timeline({ paused: true });

  tl.to(".navigation__hover__list", {
    y: "18.75rem",
    duration: 1,
  });
  tl.to(navWrapper, {
    autoAlpha: 0,
    duration: 1,
    delay: 0.5,
  });
  tl.set(navWrapper, {
    autoAlpha: 1,
    clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
  });
  tl.to(
    ".navigation__list",
    {
      autoAlpha: 1,
      delay: 3,
    },
    "-1"
  );

  return tl;
}
