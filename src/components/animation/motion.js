import { easeInOut } from "motion/react";

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay,
      ease: easeInOut,
    },
  },
});

export const scrollFadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: {
    duration: 1.2,
    delay,
    ease: easeInOut,
  },
});
