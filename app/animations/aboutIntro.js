import gsap from "gsap";

export default function aboutIntro({ spans, images }) {
  const defaults = { ease: "power2", duration: 0.75 };
  const tl = gsap.timeline({ paused: true, defaults });

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
      x: "100%",
      clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
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
      // height: "0%",
      autoAlpha: 0,
      scale: 1.5,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    },
    {
      // height: "100%",
      autoAlpha: 1,
      scale: 1,
      duration: 2,
      stagger: 0.2,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    },
    0
  );

  return tl;
}
