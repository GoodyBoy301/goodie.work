import gsap from "gsap";

export default function flagIntro({ position, scale, x }) {
  const defaults = { ease: "power1.in", delay: 0.5 };
  const tl = gsap.timeline({ paused: true, defaults });

  tl.fromTo(
    position,
    {
      x: x.initial * x.constant,
    },
    {
      x: x.position * x.constant,
      duration: 1,
    },
    0
  );
  tl.fromTo(
    scale,
    {
      x: 0,
    },
    {
      x: x.scale * x.constant,
      duration: 1,
    },
    0
  );

  return tl;
}
