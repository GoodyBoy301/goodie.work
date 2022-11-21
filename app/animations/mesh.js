import gsap from "gsap";

export function intro(material) {
  const defaults = { ease: "power4", delay: 2.5 };
  const tl = gsap.timeline({ paused: true, defaults });

  tl.to(material.color, {
    r: 1,
    g: 1,
    b: 1,
    duration: 0.5,
  });

  tl.fromTo(
    material,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 0.5,
    },
    0
  );

  return tl;
}

export function outro(material) {
  const defaults = {
    ease: "power4",
  };
  const tl = gsap.timeline({ paused: true, defaults });

  tl.to(material.color, {
    r: 0,
    g: 0,
    b: 0,
    duration: 0.5,
  });
  tl.to(
    material,
    {
      opacity: 0,
      duration: 0.5,
      delay: 0.1,
    },
    0
  );

  return tl;
}
