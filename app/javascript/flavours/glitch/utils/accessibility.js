import ready from "../ready";

ready(() => {
  setReducedMotionBodyClass();
});

export function setMediaQueryBodyClass(query, className) {
  if (query.matches) {
    document.body.classList.add(className.true);
    document.body.classList.remove(className.false);
  } else {
    document.body.classList.add(className.false);
    document.body.classList.remove(className.true);
  }
}

export function setReducedMotionBodyClass() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const className = {
    true: "reduce-motion",
    false: "no-reduce-motion",
  };

  setMediaQueryBodyClass(prefersReducedMotion, className);
  prefersReducedMotion.addEventListener("change", () => setReducedMotionBodyClass(prefersReducedMotion));
}
