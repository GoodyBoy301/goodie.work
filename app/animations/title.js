import gsap from "gsap";
import { split } from "utils/text";

export function bigTitle() {
  const defaults = { ease: "power4", delay: 1.5 };
  const tl = gsap.timeline({ paused: true, defaults });
  const element = document.querySelectorAll("h1[data-bigTitle]");
  if (!element) return;

  tl.fromTo(
    element,
    {
      autoAlpha: 0,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%",
      y: "50%",
    },
    {
      autoAlpha: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%",
      duration: 1,
      y: 0,
    },
    0
  );

  const elements = document.querySelectorAll(
    ".contact__credit, .contact__detail"
  );
  if (!elements.length) return tl;

  tl.fromTo(
    elements,
    {
      autoAlpha: 0,
    },
    {
      autoAlpha: 1,
      duration: 1.5,
      stagger: { amount: 0.8, grid: [2, 4], axis: "x" },
    },
    0.5
  );

  return tl;
}

export function midTitle() {
  const defaults = { ease: "expo", delay: 1.5 };
  const tl = gsap.timeline({ paused: true, defaults });
  let elements = document.querySelectorAll("h1[data-midTitle]");
  if (!elements.length) return;

  tl.fromTo(
    elements,
    {
      autoAlpha: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%",
      y: "100%",
    },
    {
      autoAlpha: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%",
      duration: 1,
      y: 0,
    },
    0
  );

  elements = document.querySelectorAll(".work__experience");
  if (!elements.length) return tl;

  tl.fromTo(
    elements,
    {
      autoAlpha: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%",
      y: "25vw",
    },
    {
      autoAlpha: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%",
      duration: 1,
      y: 0,
      stagger: { amount: 0.4, ease: "power1.in" },
    },
    0
  );

  const projects = document.querySelectorAll(
    ".playground__project__description>*"
  );
  if (!projects.length) return tl;

  tl.fromTo(
    projects,
    {
      autoAlpha: 0,
    },
    {
      autoAlpha: 1,
      duration: 1.5,
      stagger: { amount: 0.5, grid: [4, 4], axis: "x" },
    },
    0.25
  );

  return tl;
}

export function subTitle() {
  const defaults = { ease: "expo", delay: 1.75 };
  const tl = gsap.timeline({ paused: true, defaults });
  let element = document.querySelector("[data-subTitle]");
  if (!element) return;
  split({ element });

  tl.set(element, { autoAlpha: 1 });
  tl.fromTo(
    element.children,
    {
      autoAlpha: 0.5,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%",
      y: "100%",
    },
    {
      autoAlpha: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%",
      duration: 1,
      y: 0,
      stagger: { amount: 0.35 },
    },
    0
  );

  element = document.querySelector("[data-suburbTitle]");
  if (!element) return tl;
  split({ element });

  tl.fromTo(
    element.children,
    {
      autoAlpha: 0.5,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%",
      y: "100%",
    },
    {
      autoAlpha: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%",
      duration: 0.75,
      y: 0,
      stagger: { amount: 0.25 },
    },
    0.1
  );

  return tl;
}
