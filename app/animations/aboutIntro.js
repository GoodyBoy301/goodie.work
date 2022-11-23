import gsap from "gsap";

export default function aboutIntro({ spans, ...elements }) {
  const defaults = { ease: "power2", duration: 0.75 };
  const tl = gsap.timeline({ paused: true, defaults });

  const images = Array.from(elements.images).slice(0, 2);
  const flag = Array.from(elements.medias)[2];

  tl.set(".about__text", { opacity: 1 });
  tl.fromTo(
    spans[0],
    {
      y: "-100%",
      clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    },
    { y: 0, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }
  );
  tl.fromTo(
    spans[1],
    {
      x: "-100%",
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    },
    { x: 0, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
    0
  );
  tl.fromTo(
    spans[2],
    {
      x: "-100%",
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    },
    { x: 0, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
    0.06
  );
  tl.fromTo(
    spans[3],
    {
      x: "-100%",
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    },
    { x: 0, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
    0.05
  );
  tl.fromTo(
    spans[4],
    {
      x: "-100%",
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    },
    { x: 0, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
    0
  );
  tl.fromTo(
    spans[5],
    {
      y: "100%",
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    },
    { y: 0, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
    0.1
  );
  tl.fromTo(
    spans[6],
    {
      y: "100%",
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    },
    { y: 0, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
    0.15
  );
  tl.fromTo(
    images,
    {
      autoAlpha: 0,
      scale: 1.5,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    },
    {
      autoAlpha: 1,
      scale: 1,
      duration: 2,
      stagger: 0.2,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    },
    0
  );
  tl.fromTo(
    ".about__mobile__image",
    {
      autoAlpha: 0,
      scale: 1.2,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    },
    {
      autoAlpha: 1,
      scale: 1,
      duration: 2,
      stagger: 0.2,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    },
    0
  );
  tl.fromTo(
    flag.childNodes[0],
    {
      scale: 0.5,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    },
    {
      scale: 1,
      duration: 2,
      stagger: 0.2,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    },
    0
  );
  tl.fromTo(
    flag,
    {
      width: 0,
    },
    {
      width: "45rem",
      duration: 1,
      ease: "power1.in",
    },
    0
  );

  return tl;
}
