import gsap from "gsap";
import { Uniform } from "three";

export function intro({ position, scale, x, opacity }) {
  const defaults = { ease: "power1.in", delay: 1.5 };
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
  tl.fromTo(
    opacity,
    {
      value: 0.3,
    },
    {
      value: 1,
      duration: 1.2,
    },
    0
  );

  return tl;
}

export function outro(opacity, shade) {
  const defaults = { ease: "power4", delay: 0 };
  const tl = gsap.timeline({ paused: true, defaults });

  tl.fromTo(
    opacity,
    {
      value: 1,
    },
    {
      value: 0,
      duration: 1,
    },
    0
  );

  tl.fromTo(
    shade,
    {
      value: 1,
    },
    {
      value: 0,
      duration: 1,
    },
    0
  );

  return tl;
}
