import gsap from "gsap";
import Reveal from "../classes/Reveal";

export default function PlaygroundIntro() {
  const defaults = { ease: "expo", duration: 2, delay: 1.75 };
  const tl = gsap.timeline({ paused: true, defaults });
  const elements = { images: ".playground__project__image" };
  const Revealer = new Reveal({ elements });

  tl.fromTo(
    elements.images,
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      scale: 1.05,
    },
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      stagger: { amount: 1.5 },
      scale: 1,
    }
  );

  return tl;
}
